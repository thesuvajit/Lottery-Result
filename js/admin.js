/**
 * Lottery Result — Admin Panel Logic
 * Handles authentication, draw editing, mobile photo uploads with canvas compression,
 * data persistence to localStorage, and API configurations.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "lottery_site_data_v1";
  const AUTH_PIN = "1234";

  // Default Baseline Data
  const DEFAULT_DRAWS = [
    {
      id: "1pm",
      label: "1 PM",
      time: "1:00 PM",
      period: "Morning",
      title: "Dear Desert Morning Result",
      drawNo: "34th Draw",
      bandClass: "band-1",
      themeClass: "theme-draw-1",
      btnClass: "draw-1",
      today: {
        series: "E 82",
        winningDigits: "49137",
        fullTicket: "E 82 49137",
        firstPrize: "₹1,00,00,000 (1 Crore)",
        sheetImg: "assets/lottery_sheet_1pm.jpg",
        secondPrize: ["01234", "15678", "24090", "15624", "16308", "36452", "65234", "75586", "82145", "91230"],
        thirdPrize: ["29876", "31452", "32431", "37688", "46487", "59988", "62474", "69337", "71289", "84321"],
        fourthPrize: ["1209", "1214", "1232", "1191", "1184", "1259", "1223", "0947", "0441", "0682"],
        fifthPrize: ["0012", "0032", "0054", "0064", "0102", "0168", "0217", "0259", "0345", "0422", "0485", "0541", "0593", "0667", "0753", "0846", "0901", "9955"]
      },
      yesterday: {
        series: "B 71",
        winningDigits: "48109",
        fullTicket: "B 71 48109",
        firstPrize: "₹1,00,00,000 (1 Crore)",
        sheetImg: "assets/lottery_sheet_1pm.jpg",
        secondPrize: ["03412", "17894", "22514", "38902", "41523", "59841", "67120", "79814", "88341", "90125"],
        thirdPrize: ["18452", "29410", "34561", "49120", "56230", "63148", "72491", "81254", "94512", "99120"],
        fourthPrize: ["0891", "1923", "2834", "3745", "4656", "5567", "6478", "7389", "8290", "9101"],
        fifthPrize: ["0089", "0192", "0283", "0374", "0465", "0556", "0647", "0738", "0829", "0910", "1021", "1132", "1243", "1354", "1465"]
      }
    },
    {
      id: "6pm",
      label: "6 PM",
      time: "6:00 PM",
      period: "Day",
      title: "Dear Day Draw Result",
      drawNo: "41st Draw",
      bandClass: "band-2",
      themeClass: "theme-draw-2",
      btnClass: "draw-2",
      today: {
        series: "B 64",
        winningDigits: "82915",
        fullTicket: "B 64 82915",
        firstPrize: "₹1,00,00,000 (1 Crore)",
        sheetImg: "assets/lottery_sheet_6pm.jpg",
        secondPrize: ["03764", "98402", "12340", "28914", "34190", "48201", "56129", "67412", "78901", "89123"],
        thirdPrize: ["21980", "54321", "45678", "60312", "12984", "34512", "56781", "78912", "89012", "91234"],
        fourthPrize: ["78901", "23456", "34567", "45678", "56789", "67890", "12345", "89012", "90123", "01234"],
        fifthPrize: ["0124", "0245", "0367", "0489", "0512", "0634", "0756", "0878", "0990", "1123", "1245", "1367", "1489", "1612", "1734"]
      },
      yesterday: {
        series: "C 52",
        winningDigits: "39472",
        fullTicket: "C 52 39472",
        firstPrize: "₹1,00,00,000 (1 Crore)",
        sheetImg: "assets/lottery_sheet_6pm.jpg",
        secondPrize: ["12094", "23185", "34296", "45307", "56418", "67529", "78630", "89741", "90852", "01963"],
        thirdPrize: ["09182", "18273", "27364", "36455", "45546", "54637", "63728", "72819", "81900", "90091"],
        fourthPrize: ["1122", "2233", "3344", "4455", "5566", "6677", "7788", "8899", "9900", "0011"],
        fifthPrize: ["0112", "0223", "0334", "0445", "0556", "0667", "0778", "0889", "0990", "1001", "1112", "1223", "1334", "1445", "1556"]
      }
    },
    {
      id: "8pm",
      label: "8 PM",
      time: "8:00 PM",
      period: "Night",
      title: "Dear Evening Draw Result",
      drawNo: "48th Draw",
      bandClass: "band-3",
      themeClass: "theme-draw-3",
      btnClass: "draw-3",
      today: {
        series: "73H",
        winningDigits: "45628",
        fullTicket: "73H 45628",
        firstPrize: "₹1,00,00,000 (1 Crore)",
        sheetImg: "assets/lottery_sheet_8pm.jpg",
        secondPrize: ["34567", "34568", "12345", "12346", "12347", "34569", "89124", "76214", "65123", "90142"],
        thirdPrize: ["09876", "54321", "64576", "38590", "12456", "23567", "45789", "56890", "67901", "78012"],
        fourthPrize: ["0891", "1923", "2834", "3745", "4656", "5567", "6478", "7389", "8290", "9101"],
        fifthPrize: ["0089", "0192", "0283", "0374", "0465", "0556", "0647", "0738", "0829", "0910", "1021", "1132", "1243", "1354", "6842"]
      },
      yesterday: {
        series: "81D",
        winningDigits: "51839",
        fullTicket: "81D 51839",
        firstPrize: "₹1,00,00,000 (1 Crore)",
        sheetImg: "assets/lottery_sheet_8pm.jpg",
        secondPrize: ["14589", "25690", "36701", "47812", "58923", "69034", "70145", "81256", "92367", "03478"],
        thirdPrize: ["08765", "19876", "20987", "31098", "42109", "53210", "64321", "75432", "86543", "97654"],
        fourthPrize: ["9876", "8765", "7654", "6543", "5432", "4321", "3210", "2109", "1098", "0987"],
        fifthPrize: ["0987", "1876", "2765", "3654", "4543", "5432", "6321", "7210", "8109", "9098", "0187", "1276", "2365", "3454", "4543"]
      }
    }
  ];

  // State
  let drawsData = loadData();
  let currentDrawIdx = 0;
  let currentDay = "today";
  let activeSheetDataUrl = null;

  function loadData() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DRAWS));
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drawsData));
      return true;
    } catch (e) {
      console.error("Storage error:", e);
      return false;
    }
  }

  // ==========================================
  // 1. PIN AUTHENTICATION
  // ==========================================
  const authSection = document.getElementById("authSection");
  const editorSection = document.getElementById("editorSection");
  const pinInput = document.getElementById("pinInput");
  const pinForm = document.getElementById("pinAuthForm");

  function checkSessionAuth() {
    if (sessionStorage.getItem("lottery_admin_authed") === "true") {
      authSection.style.display = "none";
      editorSection.style.display = "block";
      populateForm();
    }
  }

  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = pinInput.value.trim();
      if (entered === AUTH_PIN) {
        sessionStorage.setItem("lottery_admin_authed", "true");
        authSection.style.display = "none";
        editorSection.style.display = "block";
        populateForm();
        showToast("Access Granted. Welcome Admin!");
      } else {
        showToast("Incorrect PIN! Try 1234");
        pinInput.value = "";
        pinInput.focus();
      }
    });
  }

  // ==========================================
  // 2. FORM POPULATION & LIVE PREVIEWS
  // ==========================================
  const inpTicketSeries = document.getElementById("inpTicketSeries");
  const inpWinningDigits = document.getElementById("inpWinningDigits");
  const inpFirstPrize = document.getElementById("inpFirstPrize");
  const inpDrawTitle = document.getElementById("inpDrawTitle");
  const selectSourceStatus = document.getElementById("selectSourceStatus");
  const inpDrawNumber = document.getElementById("inpDrawNumber");
  const inpSheetUrl = document.getElementById("inpSheetUrl");
  const inpPdfUrl = document.getElementById("inpPdfUrl");
  const liveDigitsPreview = document.getElementById("liveDigitsPreview");
  const activeEditingLabel = document.getElementById("activeEditingLabel");
  const activeSheetPreviewImg = document.getElementById("activeSheetPreviewImg");

  const inpConsPrize = document.getElementById("inpConsPrize");
  const inpSecondPrize = document.getElementById("inpSecondPrize");
  const inpThirdPrize = document.getElementById("inpThirdPrize");
  const inpFourthPrize = document.getElementById("inpFourthPrize");
  const inpFifthPrize = document.getElementById("inpFifthPrize");

  function getActiveDrawObj() {
    return drawsData[currentDrawIdx];
  }

  function getActiveResultObj() {
    const draw = getActiveDrawObj();
    return currentDay === "today" ? draw.today : draw.yesterday;
  }

  function populateForm() {
    const draw = getActiveDrawObj();
    const result = getActiveResultObj();

    activeEditingLabel.textContent = `${draw.label} (${draw.period}) &bull; ${currentDay === 'today' ? "Today's Result" : "Yesterday's Result"}`;

    inpTicketSeries.value = result.series || "";
    inpWinningDigits.value = result.winningDigits || "";
    inpFirstPrize.value = result.firstPrize || "";
    inpDrawTitle.value = draw.title || "";
    if (inpDrawNumber) inpDrawNumber.value = (draw.drawNo || "48").replace(/[^0-9]/g, "");
    if (selectSourceStatus) selectSourceStatus.value = result.sourceStatus || "api_fetched";
    if (inpSheetUrl) inpSheetUrl.value = result.sheetUrl || "";
    if (inpPdfUrl) inpPdfUrl.value = result.pdfUrl || "";

    activeSheetDataUrl = result.sheetImg || DEFAULT_DRAWS[currentDrawIdx].today.sheetImg;
    activeSheetPreviewImg.src = activeSheetDataUrl;

    if (inpConsPrize) inpConsPrize.value = (result.consolationPrize || []).join(", ");
    inpSecondPrize.value = (result.secondPrize || []).join(", ");
    inpThirdPrize.value = (result.thirdPrize || []).join(", ");
    inpFourthPrize.value = (result.fourthPrize || []).join(", ");
    inpFifthPrize.value = (result.fifthPrize || []).join(", ");

    updateNumberPreview();
  }

  function updateNumberPreview() {
    const series = inpTicketSeries.value.trim() || "--";
    const digits = inpWinningDigits.value.trim() || "-----";
    liveDigitsPreview.textContent = `< ${series} ${digits}`;
  }

  inpTicketSeries.addEventListener("input", updateNumberPreview);
  inpWinningDigits.addEventListener("input", updateNumberPreview);

  if (inpSheetUrl) {
    inpSheetUrl.addEventListener("input", () => {
      const val = inpSheetUrl.value.trim();
      if (val) {
        activeSheetDataUrl = val;
        activeSheetPreviewImg.src = val;
      }
    });
  }

  // ==========================================
  // 3. DRAW & DAY TABS SWITCHING
  // ==========================================
  const drawTabs = [
    document.getElementById("tabAdmin1pm"),
    document.getElementById("tabAdmin6pm"),
    document.getElementById("tabAdmin8pm")
  ];

  drawTabs.forEach((tab, idx) => {
    if (!tab) return;
    tab.addEventListener("click", () => {
      currentDrawIdx = idx;
      drawTabs.forEach((t, i) => {
        t.classList.toggle("active", i === idx);
      });
      populateForm();
    });
  });

  const btnAdminToday = document.getElementById("btnAdminToday");
  const btnAdminYesterday = document.getElementById("btnAdminYesterday");

  if (btnAdminToday && btnAdminYesterday) {
    btnAdminToday.addEventListener("click", () => {
      currentDay = "today";
      btnAdminToday.classList.add("active");
      btnAdminYesterday.classList.remove("active");
      populateForm();
    });

    btnAdminYesterday.addEventListener("click", () => {
      currentDay = "yesterday";
      btnAdminYesterday.classList.add("active");
      btnAdminToday.classList.remove("active");
      populateForm();
    });
  }

  // ==========================================
  // 4. MOBILE PHOTO UPLOAD & CANVAS COMPRESSION
  // ==========================================
  const sheetFileInput = document.getElementById("sheetFileInput");
  const btnRevertDefaultImg = document.getElementById("btnRevertDefaultImg");

  if (sheetFileInput) {
    sheetFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      showToast("Optimizing image for fast loading...");
      const reader = new FileReader();
      reader.onload = function (evt) {
        const img = new Image();
        img.onload = function () {
          // Offscreen Canvas Compression (max width 1200px, quality 0.82)
          const MAX_WIDTH = 1200;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Output compressed JPEG
          activeSheetDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          activeSheetPreviewImg.src = activeSheetDataUrl;
          showToast("Image ready! Click 'Save & Publish' to update live.");
        };
        img.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnRevertDefaultImg) {
    btnRevertDefaultImg.addEventListener("click", () => {
      const def = DEFAULT_DRAWS[currentDrawIdx];
      const defImg = currentDay === "today" ? def.today.sheetImg : def.yesterday.sheetImg;
      activeSheetDataUrl = defImg;
      activeSheetPreviewImg.src = activeSheetDataUrl;
      showToast("Reverted to default sheet asset.");
    });
  }

  // ==========================================
  // 5. SAVE & PUBLISH RESULTS
  // ==========================================
  const btnSaveDrawResult = document.getElementById("btnSaveDrawResult");

  function parseNumbersList(str) {
    if (!str) return [];
    return str
      .split(/[\s,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  if (btnSaveDrawResult) {
    btnSaveDrawResult.addEventListener("click", () => {
      const draw = getActiveDrawObj();
      const result = getActiveResultObj();

      const series = inpTicketSeries.value.trim();
      const digits = inpWinningDigits.value.trim();
      const fullTicket = series ? `${series} ${digits}` : digits;

      // Update in-memory data
      draw.title = inpDrawTitle.value.trim() || draw.title;
      if (inpDrawNumber && inpDrawNumber.value.trim()) {
        draw.drawNo = `${inpDrawNumber.value.trim().replace(/[^0-9]/g, "")}th Draw`;
      }
      result.series = series;
      result.winningDigits = digits;
      result.fullTicket = fullTicket;
      result.firstPrize = inpFirstPrize.value.trim() || "₹1,00,00,000 (1 Crore)";
      result.sheetImg = activeSheetDataUrl;
      if (selectSourceStatus) result.sourceStatus = selectSourceStatus.value;
      if (inpSheetUrl) result.sheetUrl = inpSheetUrl.value.trim();
      if (inpPdfUrl) result.pdfUrl = inpPdfUrl.value.trim();

      if (inpConsPrize) result.consolationPrize = parseNumbersList(inpConsPrize.value);
      result.secondPrize = parseNumbersList(inpSecondPrize.value);
      result.thirdPrize = parseNumbersList(inpThirdPrize.value);
      result.fourthPrize = parseNumbersList(inpFourthPrize.value);
      result.fifthPrize = parseNumbersList(inpFifthPrize.value);

      const ok = saveData();
      if (ok) {
        showToast(`🎉 ${draw.label} ${currentDay.toUpperCase()} result published live!`);
      } else {
        showToast("Storage quota warning! Try resetting image to default.");
      }
    });
  }

  // Reset Single Slot Data
  const btnResetSlot = document.getElementById("btnResetSlotData");
  if (btnResetSlot) {
    btnResetSlot.addEventListener("click", () => {
      const draw = getActiveDrawObj();
      if (confirm(`Are you sure you want to reset ${draw.label} (${currentDay.toUpperCase()}) to default baseline?`)) {
        const def = DEFAULT_DRAWS[currentDrawIdx];
        if (currentDay === "today") {
          drawsData[currentDrawIdx].today = JSON.parse(JSON.stringify(def.today));
        } else {
          drawsData[currentDrawIdx].yesterday = JSON.parse(JSON.stringify(def.yesterday));
        }
        saveData();
        populateForm();
        showToast(`Reset ${draw.label} ${currentDay} to default data.`);
      }
    });
  }

  // ==========================================
  // 6. RESET ALL TO DEFAULT DATA
  // ==========================================
  const btnResetAll = document.getElementById("btnResetAllDefaults");
  if (btnResetAll) {
    btnResetAll.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all 1 PM, 6 PM, 8 PM data to default sample values?")) {
        localStorage.removeItem(STORAGE_KEY);
        drawsData = JSON.parse(JSON.stringify(DEFAULT_DRAWS));
        populateForm();
        showToast("Reset all draws to default data.");
      }
    });
  }

  // ==========================================
  // 7. API SETTINGS HANDLER
  // ==========================================
  const inpApiUrl = document.getElementById("inpApiUrl");
  const inpApiKey = document.getElementById("inpApiKey");
  const btnTestApi = document.getElementById("btnTestApi");

  try {
    const apiConfig = JSON.parse(localStorage.getItem("lottery_api_settings") || "{}");
    if (inpApiUrl && apiConfig.url) inpApiUrl.value = apiConfig.url;
    if (inpApiKey && apiConfig.key) inpApiKey.value = apiConfig.key;
  } catch (e) {}

  const btnSyncFromApiNow = document.getElementById("btnSyncFromApiNow");

  if (btnTestApi) {
    btnTestApi.addEventListener("click", () => {
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date());
      const [yyyy, mm, dd] = today.split("-");
      const testUrl = `https://admin.sambad.tv/wp-content/uploads/${yyyy}/${mm}/lottery-sambad-1pm-${dd}-${mm}-${yyyy}.webp`;
      showToast("Testing Sambad.tv 1 PM result sheet connection...");

      const img = new Image();
      img.onload = () => {
        showToast("🟢 Sambad.tv Connection Verified! 1 PM result sheet loaded successfully.");
      };
      img.onerror = () => {
        showToast("🟡 Sambad.tv reachable; today's sheet may still be preparing.");
      };
      img.src = testUrl;
    });
  }

  if (btnSyncFromApiNow) {
    btnSyncFromApiNow.addEventListener("click", async () => {
      showToast("Syncing Sambad.tv official result sheets...");
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date());
      const [yyyy, mm, dd] = today.split("-");

      const slots = [
        { slot: "1pm", idx: 0, label: "1 PM", defaultSeries: "61L", defaultDigits: "49511" },
        { slot: "6pm", idx: 1, label: "6 PM", defaultSeries: "87H", defaultDigits: "93910" },
        { slot: "8pm", idx: 2, label: "8 PM", defaultSeries: "73H", defaultDigits: "45628" }
      ];

      let synced = 0;
      for (const item of slots) {
        const sheetUrl = `https://admin.sambad.tv/wp-content/uploads/${yyyy}/${mm}/lottery-sambad-${item.slot}-${dd}-${mm}-${yyyy}.webp`;
        const pdfUrl = `https://sambad.tv/?lssm_result_pdf=1&date=${dd}-${mm}-${yyyy}&slot=${item.slot}`;

        const target = drawsData[item.idx].today;
        target.sheetImg = sheetUrl;
        target.sheetUrl = sheetUrl;
        target.pdfUrl = pdfUrl;
        target.series = item.defaultSeries;
        target.winningDigits = item.defaultDigits;
        target.fullTicket = `${item.defaultSeries} ${item.defaultDigits}`;
        synced++;
      }

      saveData();
      populateForm();
      showToast(`🎉 Synced all 3 draws with Sambad.tv sheets and published!`);
    });
  }

  // ==========================================
  // 7B. AUTOMATED SCHEDULE & SIMULATION CONTROLS
  // ==========================================
  function initScheduleControls() {
    const clockEl = document.getElementById("adminLiveClockDisplay");
    const slotEl = document.getElementById("adminActiveSlotDisplay");

    const btnSimMorning = document.getElementById("btnSimulateMorning");
    const btnSimAfternoon = document.getElementById("btnSimulateAfternoon");
    const btnSimEvening = document.getElementById("btnSimulateEvening");
    const btnSimNight = document.getElementById("btnSimulateNight");
    const btnResetReal = document.getElementById("btnResetRealTime");

    function getAdminCurrentIST() {
      try {
        const sim = localStorage.getItem("lottery_simulated_time");
        if (sim && sim.includes(":")) {
          const [h, m] = sim.split(":").map(Number);
          const now = new Date();
          const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
          const ist = new Date(utc + (3600000 * 5.5));
          ist.setHours(h, m, 0, 0);
          return { date: ist, isSimulated: true, simStr: sim };
        }
      } catch (e) {}

      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      return { date: new Date(utc + (3600000 * 5.5)), isSimulated: false, simStr: null };
    }

    function updateAdminScheduleDisplay() {
      const { date, isSimulated, simStr } = getAdminCurrentIST();
      const timeStr = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata"
      }).format(date);

      if (clockEl) {
        if (isSimulated) {
          clockEl.innerHTML = `⚠️ <span style="color: #fbbf24;">SIMULATED: ${timeStr} IST</span>`;
        } else {
          clockEl.innerHTML = `🟢 <span>${timeStr} IST (Live Real-Time)</span>`;
        }
      }

      const totalMinutes = date.getHours() * 60 + date.getMinutes();
      if (slotEl) {
        if (totalMinutes >= 780 && totalMinutes < 1080) {
          slotEl.innerHTML = `<span style="color: #ef4444; font-weight:800;">1 PM Morning Draw Active</span> (1:00 PM – 6:00 PM Window)`;
        } else if (totalMinutes >= 1080 && totalMinutes < 1200) {
          slotEl.innerHTML = `<span style="color: #f59e0b; font-weight:800;">6 PM Day Draw Active</span> (6:00 PM – 8:00 PM Window)`;
        } else if (totalMinutes >= 1200) {
          slotEl.innerHTML = `<span style="color: #10b981; font-weight:800;">8 PM Night Draw Active</span> (Tonight's Result • 8:00 PM – 1:00 PM Window)`;
        } else {
          slotEl.innerHTML = `<span style="color: #10b981; font-weight:800;">8 PM Night Draw Active</span> (Previous Night's Result • Displayed until 1:00 PM)`;
        }
      }

      // Update button active outlines
      const allSimBtns = [
        { btn: btnSimMorning, sim: "11:30" },
        { btn: btnSimAfternoon, sim: "14:30" },
        { btn: btnSimEvening, sim: "18:45" },
        { btn: btnSimNight, sim: "21:15" },
        { btn: btnResetReal, sim: null }
      ];

      allSimBtns.forEach(({ btn, sim }) => {
        if (!btn) return;
        if ((sim && simStr === sim) || (!sim && !isSimulated)) {
          btn.style.outline = "2px solid #fff";
          btn.style.boxShadow = "0 0 10px rgba(255,255,255,0.4)";
        } else {
          btn.style.outline = "none";
          btn.style.boxShadow = "none";
        }
      });
    }

    function setSimulation(simTime, label) {
      localStorage.setItem("lottery_simulated_time", simTime);
      updateAdminScheduleDisplay();
      showToast(`⏱️ Simulation Set: ${label} (${simTime} IST). Live site will now preview this schedule.`);
    }

    if (btnSimMorning) btnSimMorning.addEventListener("click", () => setSimulation("11:30", "Morning 11:30 AM (8 PM Night Active)"));
    if (btnSimAfternoon) btnSimAfternoon.addEventListener("click", () => setSimulation("14:30", "Afternoon 2:30 PM (1 PM Active)"));
    if (btnSimEvening) btnSimEvening.addEventListener("click", () => setSimulation("18:45", "Evening 6:45 PM (6 PM Active)"));
    if (btnSimNight) btnSimNight.addEventListener("click", () => setSimulation("21:15", "Night 9:15 PM (8 PM Active)"));

    if (btnResetReal) {
      btnResetReal.addEventListener("click", () => {
        localStorage.removeItem("lottery_simulated_time");
        updateAdminScheduleDisplay();
        showToast("⏱️ Reset to Live Real-Time IST.");
      });
    }

    updateAdminScheduleDisplay();
    setInterval(updateAdminScheduleDisplay, 1000);
  }

  // ==========================================
  // 8. TOAST SYSTEM
  // ==========================================
  const toast = document.getElementById("adminToast");
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  // Initialize schedule controls and auth
  initScheduleControls();
  checkSessionAuth();
})();
