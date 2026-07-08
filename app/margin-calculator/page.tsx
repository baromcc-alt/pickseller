"use client";

import { useState, useMemo } from "react";
import { MARKETS, DEFAULT_MARKET_ID, getMarket } from "@/lib/constants/markets";

// ────────────────────────────────────────────
// 유틸
// ────────────────────────────────────────────

function parseNum(v: string) {
  const n = parseFloat(v.replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
}

function formatKRW(n: number) {
  return new Intl.NumberFormat("ko-KR").format(Math.round(n));
}

function pct(n: number) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
}

// ────────────────────────────────────────────
// 계산 로직 — 마진 계산기
// ────────────────────────────────────────────

interface CalcInputs {
  purchasePrice: string;
  salePrice: string;
  shippingCost: string;
  advertisingCost: string;
  packagingCost: string;
  marketId: string;
}

function calculate(inputs: CalcInputs) {
  const market = getMarket(inputs.marketId);
  const salePrice = parseNum(inputs.salePrice);
  const purchasePrice = parseNum(inputs.purchasePrice);
  const shippingCost = parseNum(inputs.shippingCost);
  const advertisingCost = parseNum(inputs.advertisingCost);
  const packagingCost = parseNum(inputs.packagingCost);

  const platformFee = salePrice * (market.platformFeeRate / 100);
  const settlementFee = salePrice * (market.settlementFeeRate / 100);
  const totalFee = platformFee + settlementFee;
  const totalCost = purchasePrice + shippingCost + totalFee + advertisingCost + packagingCost;

  const profit = salePrice - totalCost;
  const marginRate = salePrice > 0 ? (profit / salePrice) * 100 : 0;
  const roi = purchasePrice > 0 ? (profit / purchasePrice) * 100 : 0;

  const totalFeeRate = (market.platformFeeRate + market.settlementFeeRate) / 100;
  const fixedCost = purchasePrice + shippingCost + advertisingCost + packagingCost;
  const breakEven = totalFeeRate < 1 ? fixedCost / (1 - totalFeeRate) : 0;

  return {
    market, salePrice, purchasePrice, shippingCost,
    advertisingCost, packagingCost, platformFee, settlementFee,
    totalFee, totalCost, profit, marginRate, roi, breakEven,
  };
}

// ────────────────────────────────────────────
// 계산 로직 — 마진 시뮬레이터 (역산)
// 목표 마진율 → 최대 매입가
// ────────────────────────────────────────────

interface SimInputs {
  salePrice: string;
  targetMarginRate: string;
  shippingCost: string;
  advertisingCost: string;
  packagingCost: string;
  marketId: string;
}

function simulate(inputs: SimInputs) {
  const market = getMarket(inputs.marketId);
  const salePrice = parseNum(inputs.salePrice);
  const targetMarginRate = parseNum(inputs.targetMarginRate);
  const shippingCost = parseNum(inputs.shippingCost);
  const advertisingCost = parseNum(inputs.advertisingCost);
  const packagingCost = parseNum(inputs.packagingCost);

  const feeRate = (market.platformFeeRate + market.settlementFeeRate) / 100;

  // maxPurchasePrice = salePrice * (1 - targetMarginRate/100 - feeRate) - 기타비용
  const maxPurchasePrice =
    salePrice * (1 - targetMarginRate / 100 - feeRate) -
    shippingCost - advertisingCost - packagingCost;

  const platformFee = salePrice * (market.platformFeeRate / 100);
  const settlementFee = salePrice * (market.settlementFeeRate / 100);
  const targetProfit = salePrice * (targetMarginRate / 100);
  const roi = maxPurchasePrice > 0 ? (targetProfit / maxPurchasePrice) * 100 : 0;

  // 마진율별 시나리오
  const scenarios = [10, 15, 20, 25, 30].map((rate) => ({
    rate,
    maxPurchase: salePrice * (1 - rate / 100 - feeRate) - shippingCost - advertisingCost - packagingCost,
  }));

  return {
    market, salePrice, targetMarginRate, shippingCost,
    advertisingCost, packagingCost, platformFee, settlementFee,
    maxPurchasePrice, targetProfit, roi, feeRate, scenarios,
  };
}

// ────────────────────────────────────────────
// 페이지
// ────────────────────────────────────────────

type Tab = "calculator" | "simulator";

export default function MarginCalculatorPage() {
  const [tab, setTab] = useState<Tab>("calculator");

  // 마진계산기 상태
  const [inputs, setInputs] = useState<CalcInputs>({
    purchasePrice: "", salePrice: "",
    shippingCost: "3000", advertisingCost: "",
    packagingCost: "500", marketId: DEFAULT_MARKET_ID,
  });

  // 시뮬레이터 상태
  const [simInputs, setSimInputs] = useState<SimInputs>({
    salePrice: "", targetMarginRate: "20",
    shippingCost: "3000", advertisingCost: "",
    packagingCost: "500", marketId: DEFAULT_MARKET_ID,
  });

  const set = (field: keyof CalcInputs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setInputs((prev) => ({ ...prev, [field]: e.target.value }));

  const setSim = (field: keyof SimInputs) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setSimInputs((prev) => ({ ...prev, [field]: e.target.value }));

  const handleMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const market = getMarket(e.target.value);
    setInputs((prev) => ({
      ...prev, marketId: e.target.value,
      shippingCost: String(market.shippingCost),
    }));
  };

  const handleSimMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const market = getMarket(e.target.value);
    setSimInputs((prev) => ({
      ...prev, marketId: e.target.value,
      shippingCost: String(market.shippingCost),
    }));
  };

  const r = useMemo(() => calculate(inputs), [inputs]);
  const s = useMemo(() => simulate(simInputs), [simInputs]);

  const hasInput = r.salePrice > 0 && r.purchasePrice > 0;
  const hasSimInput = s.salePrice > 0 && s.targetMarginRate > 0;

  const profitColor = !hasInput ? "text-gray-300"
    : r.profit >= 0 ? "text-green-600" : "text-red-500";
  const marginColor = !hasInput ? "text-gray-300"
    : r.marginRate >= 20 ? "text-blue-600"
    : r.marginRate >= 10 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">마진 계산기</h1>
        <p className="text-gray-500 text-sm">마켓 수수료를 자동 반영한 마진·손익분기·역산 도구</p>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {([
          { id: "calculator", label: "📊 마진 계산기" },
          { id: "simulator", label: "🎯 마진 시뮬레이터" },
        ] as { id: Tab; label: string }[]).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === id
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ────── 마진 계산기 탭 ────── */}
      {tab === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 card p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">판매 마켓</label>
              <select value={inputs.marketId} onChange={handleMarketChange} className="input">
                {MARKETS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">{r.market.notes}</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <FeeTag label="판매 수수료" value={`${r.market.platformFeeRate}%`} />
              {r.market.settlementFeeRate > 0 && (
                <FeeTag label="결제 수수료" value={`${r.market.settlementFeeRate}%`} />
              )}
              <FeeTag
                label="총 수수료"
                value={`${(r.market.platformFeeRate + r.market.settlementFeeRate).toFixed(2)}%`}
                highlight
              />
            </div>

            <hr className="border-gray-100" />
            <InputRow label="판매가" unit="원" required value={inputs.salePrice} onChange={set("salePrice")} placeholder="예: 35000" />
            <InputRow label="매입가 (원가)" unit="원" required value={inputs.purchasePrice} onChange={set("purchasePrice")} placeholder="예: 12000" />
            <hr className="border-gray-100" />
            <InputRow label="배송비" unit="원" value={inputs.shippingCost} onChange={set("shippingCost")} placeholder="3000" />
            <InputRow label="광고비" unit="원" value={inputs.advertisingCost} onChange={set("advertisingCost")} placeholder="0" />
            <InputRow label="포장비" unit="원" value={inputs.packagingCost} onChange={set("packagingCost")} placeholder="500" />

            <button
              onClick={() => setInputs({ purchasePrice: "", salePrice: "", shippingCost: String(r.market.shippingCost), advertisingCost: "", packagingCost: "500", marketId: inputs.marketId })}
              className="btn-secondary w-full text-sm"
            >
              초기화
            </button>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className={`card p-6 ${hasInput ? (r.profit >= 0 ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50") : ""}`}>
              <p className="text-sm font-medium text-gray-500 mb-1">순이익 (1개 판매 기준)</p>
              <p className={`text-5xl font-bold tracking-tight ${profitColor}`}>
                {hasInput ? `${r.profit >= 0 ? "+" : ""}${formatKRW(r.profit)}원` : "—"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <MetricCard label="마진율" value={hasInput ? pct(r.marginRate) : "—"} sub={hasInput ? (r.marginRate >= 20 ? "양호" : r.marginRate >= 10 ? "주의" : "위험") : ""} color={marginColor} />
              <MetricCard label="ROI" value={hasInput ? pct(r.roi) : "—"} sub={hasInput ? "투자 대비 수익" : ""} color={!hasInput ? "text-gray-300" : r.roi >= 30 ? "text-blue-600" : "text-yellow-500"} />
              <MetricCard label="손익분기 판매가" value={hasInput ? `${formatKRW(r.breakEven)}원` : "—"} sub={hasInput && r.salePrice > r.breakEven ? `여유 ${formatKRW(r.salePrice - r.breakEven)}원` : ""} color={!hasInput ? "text-gray-300" : r.salePrice > r.breakEven ? "text-blue-600" : "text-red-500"} />
            </div>

            {hasInput && (
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">비용 내역</h3>
                <div className="space-y-2">
                  <CostRow label="판매가" value={r.salePrice} />
                  <div className="h-px bg-gray-100" />
                  <CostRow label="매입가" value={-r.purchasePrice} />
                  <CostRow label={`판매 수수료 (${r.market.platformFeeRate}%)`} value={-r.platformFee} />
                  {r.settlementFee > 0 && <CostRow label={`결제 수수료 (${r.market.settlementFeeRate}%)`} value={-r.settlementFee} />}
                  <CostRow label="배송비" value={-r.shippingCost} />
                  {r.advertisingCost > 0 && <CostRow label="광고비" value={-r.advertisingCost} />}
                  {r.packagingCost > 0 && <CostRow label="포장비" value={-r.packagingCost} />}
                  <div className="h-px bg-gray-100" />
                  <CostRow label="총 비용" value={-r.totalCost} />
                  <div className="h-px bg-gray-200" />
                  <CostRow label="순이익" value={r.profit} bold />
                </div>
              </div>
            )}

            {!hasInput && (
              <div className="card p-8 text-center text-gray-400 text-sm">
                판매가와 매입가를 입력하면<br />결과가 여기에 표시됩니다.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ────── 마진 시뮬레이터 탭 ────── */}
      {tab === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 card p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">판매 마켓</label>
              <select value={simInputs.marketId} onChange={handleSimMarketChange} className="input">
                {MARKETS.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
              <p className="text-xs text-gray-400 mt-1">{s.market.notes}</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <FeeTag label="총 수수료" value={`${(s.market.platformFeeRate + s.market.settlementFeeRate).toFixed(2)}%`} highlight />
            </div>

            <hr className="border-gray-100" />
            <InputRow label="판매가" unit="원" required value={simInputs.salePrice} onChange={setSim("salePrice")} placeholder="예: 35000" />

            {/* 목표 마진율 슬라이더 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                목표 마진율 <span className="text-blue-600 font-bold">{simInputs.targetMarginRate}%</span>
              </label>
              <input
                type="range" min={1} max={60} step={1}
                value={simInputs.targetMarginRate}
                onChange={setSim("targetMarginRate")}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1%</span><span>30%</span><span>60%</span>
              </div>
            </div>

            <hr className="border-gray-100" />
            <InputRow label="배송비" unit="원" value={simInputs.shippingCost} onChange={setSim("shippingCost")} placeholder="3000" />
            <InputRow label="광고비" unit="원" value={simInputs.advertisingCost} onChange={setSim("advertisingCost")} placeholder="0" />
            <InputRow label="포장비" unit="원" value={simInputs.packagingCost} onChange={setSim("packagingCost")} placeholder="500" />

            <button
              onClick={() => setSimInputs({ salePrice: "", targetMarginRate: "20", shippingCost: String(s.market.shippingCost), advertisingCost: "", packagingCost: "500", marketId: simInputs.marketId })}
              className="btn-secondary w-full text-sm"
            >
              초기화
            </button>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {/* 최대 매입가 */}
            <div className={`card p-6 ${hasSimInput ? (s.maxPurchasePrice > 0 ? "border-blue-200 bg-blue-50" : "border-red-200 bg-red-50") : ""}`}>
              <p className="text-sm font-medium text-gray-500 mb-1">
                마진율 {hasSimInput ? simInputs.targetMarginRate : "—"}% 달성을 위한 최대 매입가
              </p>
              <p className={`text-5xl font-bold tracking-tight ${!hasSimInput ? "text-gray-300" : s.maxPurchasePrice > 0 ? "text-blue-700" : "text-red-500"}`}>
                {hasSimInput
                  ? s.maxPurchasePrice > 0
                    ? `${formatKRW(s.maxPurchasePrice)}원`
                    : "불가 (수수료 초과)"
                  : "—"}
              </p>
              {hasSimInput && s.maxPurchasePrice > 0 && (
                <p className="text-sm text-blue-500 mt-2">
                  이 가격 이하로 매입해야 목표 마진 달성 가능
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                label="목표 순이익"
                value={hasSimInput ? `+${formatKRW(s.targetProfit)}원` : "—"}
                sub={hasSimInput ? "1개 판매 기준" : ""}
                color={!hasSimInput ? "text-gray-300" : "text-green-600"}
              />
              <MetricCard
                label="예상 ROI"
                value={hasSimInput && s.maxPurchasePrice > 0 ? pct(s.roi) : "—"}
                sub={hasSimInput ? "투자 대비 수익률" : ""}
                color={!hasSimInput ? "text-gray-300" : s.roi >= 30 ? "text-blue-600" : "text-yellow-500"}
              />
            </div>

            {/* 비용 구조 */}
            {hasSimInput && s.maxPurchasePrice > 0 && (
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">비용 구조 (역산 기준)</h3>
                <div className="space-y-2">
                  <CostRow label="판매가" value={s.salePrice} />
                  <div className="h-px bg-gray-100" />
                  <CostRow label="최대 매입가" value={-s.maxPurchasePrice} />
                  <CostRow label={`판매 수수료 (${s.market.platformFeeRate}%)`} value={-s.platformFee} />
                  {s.settlementFee > 0 && <CostRow label={`결제 수수료 (${s.market.settlementFeeRate}%)`} value={-s.settlementFee} />}
                  <CostRow label="배송비" value={-s.shippingCost} />
                  {parseNum(simInputs.advertisingCost) > 0 && <CostRow label="광고비" value={-parseNum(simInputs.advertisingCost)} />}
                  {parseNum(simInputs.packagingCost) > 0 && <CostRow label="포장비" value={-parseNum(simInputs.packagingCost)} />}
                  <div className="h-px bg-gray-200" />
                  <CostRow label={`목표 순이익 (${simInputs.targetMarginRate}%)`} value={s.targetProfit} bold />
                </div>
              </div>
            )}

            {/* 마진율별 시나리오 */}
            {hasSimInput && (
              <div className="card p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">📊 마진율별 최대 매입가 시나리오</h3>
                <div className="space-y-2">
                  {s.scenarios.map(({ rate, maxPurchase }) => (
                    <div
                      key={rate}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        rate === parseNum(simInputs.targetMarginRate)
                          ? "bg-blue-50 border border-blue-200 font-semibold"
                          : "bg-gray-50"
                      }`}
                    >
                      <span className="text-gray-600">마진율 {rate}%</span>
                      <span className={maxPurchase > 0 ? "text-gray-900" : "text-red-400"}>
                        {maxPurchase > 0 ? `최대 ${formatKRW(maxPurchase)}원` : "불가"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hasSimInput && (
              <div className="card p-8 text-center text-gray-400 text-sm">
                판매가와 목표 마진율을 입력하면<br />최대 매입가를 자동으로 계산합니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────
// 서브 컴포넌트
// ────────────────────────────────────────────

function InputRow({ label, unit, value, onChange, placeholder, required }: {
  label: string; unit: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <div className="flex items-center gap-2">
        <input type="number" min={0} value={value} onChange={onChange} placeholder={placeholder} className="input flex-1" />
        <span className="text-sm text-gray-400 shrink-0 w-6">{unit}</span>
      </div>
    </div>
  );
}

function FeeTag({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${highlight ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
      {label} <strong>{value}</strong>
    </span>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="card p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-lg font-bold leading-tight ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function CostRow({ label, value, bold }: { label: string; value: number; bold?: boolean }) {
  const isNeg = value < 0;
  const isProfit = bold && value > 0;
  return (
    <div className={`flex justify-between text-sm ${bold ? "font-semibold text-gray-900" : "text-gray-500"}`}>
      <span>{label}</span>
      <span className={isProfit ? "text-green-600" : isNeg ? "text-red-400" : "text-gray-700"}>
        {value >= 0 ? "+" : ""}{formatKRW(value)}원
      </span>
    </div>
  );
}
