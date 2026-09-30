(function () {
  var modeTodayBtn = document.getElementById('modeToday');
  var modeDateBtn = document.getElementById('modeDate');
  var panelToday = document.getElementById('panelToday');
  var panelDate = document.getElementById('panelDate');
  var birthToday = document.getElementById('birthToday');
  var birthDate = document.getElementById('birthDate');
  var atDate = document.getElementById('atDate');
  var resultAge = document.getElementById('resultAge');
  var resultHint = document.getElementById('resultHint');
  var detailExact = document.getElementById('detailExact');
  var detailZero = document.getElementById('detailZero');
  var detailPlus = document.getElementById('detailPlus');

  var ACTIVE_MODE = 'today';

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function todayISO() {
    var t = new Date();
    return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate());
  }

  function parse(s) {
    if (!s) return null;
    var p = s.split('-');
    if (p.length !== 3) return null;
    var y = parseInt(p[0], 10), m = parseInt(p[1], 10), d = parseInt(p[2], 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    var dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
    return dt;
  }

  function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }

  function addMonths(dt, n) {
    var y = dt.getFullYear(), m = dt.getMonth(), d = dt.getDate();
    var total = m + n;
    var ny = y + Math.floor(total / 12);
    var nm = ((total % 12) + 12) % 12;
    return new Date(ny, nm, Math.min(d, daysInMonth(ny, nm)));
  }

  function cmp(a, b) {
    var A = a.getFullYear() * 10000 + a.getMonth() * 100 + a.getDate();
    var B = b.getFullYear() * 10000 + b.getMonth() * 100 + b.getDate();
    return A < B ? -1 : (A > B ? 1 : 0);
  }

  function daysBetween(a, b) { return Math.round((b - a) / 86400000); }

  function compute(birthD, targetD) {
    if (!birthD || !targetD) return { error: 'empty' };
    if (cmp(birthD, targetD) > 0) return { error: 'future' };

    // 足歲：已經過完幾次生日
    var years = targetD.getFullYear() - birthD.getFullYear();
    var ann = addMonths(birthD, years * 12);
    if (cmp(ann, targetD) > 0) years--;
    var lastBirthday = addMonths(birthD, years * 12);

    // 距上次生日的零數（幾個月 + 幾天）
    var monthsSince = 0;
    var cursor = lastBirthday;
    while (true) {
      var next = addMonths(lastBirthday, monthsSince + 1);
      if (cmp(next, targetD) > 0) break;
      monthsSince++;
      cursor = next;
    }
    var daysSince = daysBetween(cursor, targetD);

    // 超過六個月才加一歲；剛好滿六個月當天還不加
    var sixPoint = addMonths(lastBirthday, 6);
    var over6 = cmp(targetD, sixPoint) > 0;
    var insAge = over6 ? years + 1 : years;

    return {
      insAge: insAge,
      exactYears: years,
      monthsSince: monthsSince,
      daysSince: daysSince,
      over6: over6
    };
  }

  function zeroLabel(r) {
    var parts = [];
    if (r.monthsSince > 0) parts.push(r.monthsSince + ' 個月');
    parts.push(r.daysSince + ' 天');
    return parts.join(' ');
  }

  function render() {
    var birthD, targetD;
    if (ACTIVE_MODE === 'today') {
      birthD = parse(birthToday.value);
      targetD = parse(todayISO());
    } else {
      birthD = parse(birthDate.value);
      targetD = parse(atDate.value);
    }

    var r = compute(birthD, targetD);

    if (r.error === 'empty') {
      resultAge.textContent = '—';
      resultHint.textContent = '請先輸入生日與日期';
      detailExact.textContent = '—';
      detailZero.textContent = '—';
      detailPlus.textContent = '—';
      return;
    }
    if (r.error === 'future') {
      resultAge.textContent = '—';
      resultHint.textContent = '生日比要計算的日期還晚，請檢查順序';
      detailExact.textContent = '—';
      detailZero.textContent = '—';
      detailPlus.textContent = '—';
      return;
    }

    resultAge.textContent = r.insAge + ' 歲';
    detailExact.textContent = r.exactYears + ' 歲';
    detailZero.textContent = zeroLabel(r);
    detailPlus.textContent = r.over6 ? '超過 6 個月 → 加一歲' : '未超過 6 個月 → 不加';

    if (r.over6) {
      resultHint.textContent = '距離上次生日已過 ' + zeroLabel(r) + '，跨越半年，保險年齡加算一歲。';
    } else if (r.monthsSince === 6 && r.daysSince === 0) {
      resultHint.textContent = '距離上次生日剛好滿 6 個月，還沒「超過」，保險年齡不加一歲。';
    } else {
      resultHint.textContent = '距離上次生日只過 ' + zeroLabel(r) + '，未超過六個月，保險年齡不加一歲。';
    }
  }

  function setMode(mode) {
    ACTIVE_MODE = mode;
    var isToday = mode === 'today';
    modeTodayBtn.classList.toggle('active', isToday);
    modeDateBtn.classList.toggle('active', !isToday);
    modeTodayBtn.setAttribute('aria-selected', isToday ? 'true' : 'false');
    modeDateBtn.setAttribute('aria-selected', isToday ? 'false' : 'true');
    panelToday.hidden = !isToday;
    panelDate.hidden = isToday;
    render();
  }

  modeTodayBtn.addEventListener('click', function () { setMode('today'); });
  modeDateBtn.addEventListener('click', function () { setMode('date'); });

  [birthToday, birthDate, atDate].forEach(function (el) {
    if (el) el.addEventListener('input', render);
  });

  // 預設：制定日期模式先把「要計算的日期」填今天，方便直接改
  if (atDate) atDate.value = todayISO();

  render();
})();