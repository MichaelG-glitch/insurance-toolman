(function(){
  const premiumEl = document.getElementById('premium');
  const daysEl = document.getElementById('days');
  const shortRateEl = document.getElementById('shortRate');
  const shortAmountEl = document.getElementById('shortAmount');
  const shortHintEl = document.getElementById('shortHint');
  const dayRateEl = document.getElementById('dayRate');
  const dayAmountEl = document.getElementById('dayAmount');
  const dayHintEl = document.getElementById('dayHint');
  const diffEl = document.getElementById('diff');
  const diffAmountEl = document.getElementById('diffAmount');
  const diffNoteEl = document.getElementById('diffNote');

  // 短期費率表（已滿期保費比例，依已過月數）
  const shortRates = [15, 25, 35, 45, 55, 65, 75, 80, 85, 90, 95, 100];
  const monthLabels = [
    '未滿 1 個月', '1 個月以上未滿 2 個月', '2 個月以上未滿 3 個月',
    '3 個月以上未滿 4 個月', '4 個月以上未滿 5 個月', '5 個月以上未滿 6 個月',
    '6 個月以上未滿 7 個月', '7 個月以上未滿 8 個月', '8 個月以上未滿 9 個月',
    '9 個月以上未滿 10 個月', '10 個月以上未滿 11 個月', '11 個月以上至 12 個月'
  ];

  function fmt(n){
    if (n == null || isNaN(n)) return '—';
    return Math.round(n).toLocaleString('zh-TW');
  }

  function calc(){
    const premium = parseFloat(premiumEl.value);
    const days = parseFloat(daysEl.value);

    if (isNaN(premium) || premium < 0 || isNaN(days) || days < 0 || days > 365) {
      shortRateEl.textContent = '—';
      shortAmountEl.textContent = '—';
      shortHintEl.textContent = '請輸入有效的保費與天數（0～365）';
      dayRateEl.textContent = '—';
      dayAmountEl.textContent = '—';
      dayHintEl.textContent = '請輸入有效的保費與天數（0～365）';
      diffEl.hidden = true;
      return;
    }

    // 短期費率表：已過天數 → 月數（30 天概算）
    const monthIdx = Math.min(Math.floor(days / 30), 11);
    const shortRate = shortRates[monthIdx];
    const refundRate = 100 - shortRate;
    const shortAmount = premium * refundRate / 100;

    // 日數比例
    const remaining = Math.max(365 - days, 0);
    const dayAmount = premium * remaining / 365;

    shortRateEl.textContent = '已滿期 ' + shortRate + '% → 退還 ' + refundRate + '%';
    shortAmountEl.textContent = '退 ' + fmt(shortAmount) + ' 元';
    shortHintEl.textContent = '依短期費率表（' + monthLabels[monthIdx] + '）';

    dayRateEl.textContent = '剩餘 ' + Math.round(remaining) + ' 天 ÷ 365';
    dayAmountEl.textContent = '退 ' + fmt(dayAmount) + ' 元';
    dayHintEl.textContent = '按日數比例精算';

    const diff = dayAmount - shortAmount;
    diffEl.hidden = false;
    diffAmountEl.textContent = '約 ' + fmt(Math.abs(diff)) + ' 元';
    if (diff > 0) {
      diffNoteEl.textContent = '日數比例比短期費率表多退。若是換車銜接或牌照異動，退費本就該按日數比例。';
    } else if (diff < 0) {
      diffNoteEl.textContent = '本例短期費率表退得較多（少見，通常發生在極早期退保的邊界）。';
    } else {
      diffNoteEl.textContent = '兩種算法退費相同。';
    }
  }

  premiumEl.addEventListener('input', calc);
  daysEl.addEventListener('input', calc);
  calc();
})();
