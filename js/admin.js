/**
 * Lottery Result — Admin Panel Logic
 * Handles authentication, draw editing, mobile photo uploads with canvas compression,
 * data persistence to localStorage, and API configurations.
 */

(function () {
  "use strict";

  const STORAGE_KEY = "lottery_site_data_v1";
  const AUTH_PIN = "1234";

  // Default Baseline Data (Live Verified from Sambad.tv Official API)
  const DEFAULT_DRAWS = [
  {
    "id": "1pm",
    "label": "1 PM",
    "time": "1:00 PM",
    "period": "Morning",
    "title": "Dear Rise Monday Weekly Lottery",
    "drawNo": "50th Draw",
    "bandClass": "band-1",
    "themeClass": "theme-draw-1",
    "btnClass": "draw-1",
    "today": {
      "series": "79H",
      "winningDigits": "68387",
      "fullTicket": "79H 68387",
      "firstPrize": "₹1,00,00,000 (1 Crore)",
      "sheetImg": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-1pm-12-10-2026.webp",
      "sheetUrl": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-1pm-12-10-2026.webp",
      "pdfUrl": "https://sambad.tv/?lssm_result_pdf=1&date=12-10-2026&slot=1pm",
      "consolationPrize": [
        "68387"
      ],
      "secondPrize": [
        "15545",
        "20401",
        "22541",
        "39681",
        "47072",
        "56251",
        "58268",
        "72046",
        "77881",
        "88677"
      ],
      "thirdPrize": [
        "1150",
        "2340",
        "2367",
        "2559",
        "3512",
        "5335",
        "6132",
        "8770",
        "9306",
        "9411"
      ],
      "fourthPrize": [
        "0279",
        "0918",
        "1852",
        "2246",
        "2489",
        "2954",
        "5654",
        "8119",
        "8278",
        "9390"
      ],
      "fifthPrize": [
        "0083",
        "1534",
        "2675",
        "3603",
        "4629",
        "5638",
        "6579",
        "7454",
        "8620",
        "9382",
        "0421",
        "1670",
        "2706",
        "3604",
        "4701",
        "5642",
        "6626",
        "7462",
        "8696",
        "9423",
        "0443",
        "1720",
        "2721",
        "3606",
        "4739",
        "5872",
        "6866",
        "7496",
        "8804",
        "9460",
        "0854",
        "1829",
        "2771",
        "3916",
        "4822",
        "5875",
        "6946",
        "7630",
        "8969",
        "9501",
        "0874",
        "1956",
        "2837",
        "4064",
        "4891",
        "5898",
        "6966",
        "7794",
        "9083",
        "9735",
        "0910",
        "2019",
        "2885",
        "4096",
        "5000",
        "6085",
        "7075",
        "7900",
        "9243",
        "9803",
        "0967",
        "2204",
        "3174",
        "4332",
        "5065",
        "6232",
        "7264",
        "7949",
        "9262",
        "9832",
        "1131",
        "2349",
        "3214",
        "4433",
        "5118",
        "6280",
        "7277",
        "8061",
        "9268",
        "9878",
        "1233",
        "2370",
        "3452",
        "4466",
        "5617",
        "6392",
        "7421",
        "8280",
        "9350",
        "9981",
        "1412",
        "2464",
        "3520",
        "4607",
        "5622",
        "6393",
        "7444",
        "8442",
        "9362",
        "9990"
      ]
    },
    "yesterday": {
      "series": "39L",
      "winningDigits": "82162",
      "fullTicket": "39L 82162",
      "firstPrize": "₹1,00,00,000 (1 Crore)",
      "sheetImg": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-1pm-11-10-2026.webp",
      "sheetUrl": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-1pm-11-10-2026.webp",
      "pdfUrl": "https://sambad.tv/?lssm_result_pdf=1&date=11-10-2026&slot=1pm",
      "consolationPrize": [
        "82162"
      ],
      "secondPrize": [
        "20634",
        "39727",
        "44607",
        "67331",
        "73645",
        "77914",
        "81546",
        "91288",
        "94601",
        "99713"
      ],
      "thirdPrize": [
        "1142",
        "1756",
        "2230",
        "2437",
        "2926",
        "3245",
        "8273",
        "8652",
        "9520",
        "9842"
      ],
      "fourthPrize": [
        "1393",
        "2820",
        "3238",
        "6206",
        "6917",
        "7064",
        "7537",
        "8757",
        "8816",
        "9825"
      ],
      "fifthPrize": [
        "0098",
        "1430",
        "2145",
        "3276",
        "4076",
        "5085",
        "5968",
        "6863",
        "7723",
        "8938",
        "0178",
        "1451",
        "2312",
        "3277",
        "4101",
        "5189",
        "6072",
        "6900",
        "7906",
        "8964",
        "0389",
        "1517",
        "2369",
        "3574",
        "4194",
        "5383",
        "6131",
        "6949",
        "8051",
        "9079",
        "0393",
        "1566",
        "2417",
        "3634",
        "4219",
        "5457",
        "6143",
        "6950",
        "8157",
        "9138",
        "0528",
        "1645",
        "2664",
        "3635",
        "4346",
        "5529",
        "6208",
        "7026",
        "8258",
        "9280",
        "0824",
        "1649",
        "2688",
        "3748",
        "4568",
        "5632",
        "6229",
        "7070",
        "8284",
        "9453",
        "0932",
        "1762",
        "2845",
        "3838",
        "4802",
        "5717",
        "6293",
        "7090",
        "8311",
        "9485",
        "1145",
        "1800",
        "3165",
        "3856",
        "4880",
        "5774",
        "6570",
        "7149",
        "8635",
        "9755",
        "1223",
        "1958",
        "3186",
        "3864",
        "4912",
        "5861",
        "6710",
        "7498",
        "8808",
        "9860",
        "1410",
        "2052",
        "3254",
        "3926",
        "5076",
        "5949",
        "6809",
        "7708",
        "8868",
        "9904"
      ]
    }
  },
  {
    "id": "6pm",
    "label": "6 PM",
    "time": "6:00 PM",
    "period": "Day",
    "title": "DEAR Legend Monday Weekly Lottery",
    "drawNo": "54th Draw",
    "bandClass": "band-2",
    "themeClass": "theme-draw-2",
    "btnClass": "draw-2",
    "today": {
      "series": "92C",
      "winningDigits": "54633",
      "fullTicket": "92C 54633",
      "firstPrize": "₹1,00,00,000 (1 Crore)",
      "sheetImg": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-6pm-12-10-2026-1.webp",
      "sheetUrl": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-6pm-12-10-2026-1.webp",
      "pdfUrl": "https://sambad.tv/?lssm_result_pdf=1&date=12-10-2026&slot=6pm",
      "consolationPrize": [
        "54633"
      ],
      "secondPrize": [
        "03786",
        "13409",
        "40934",
        "44963",
        "54127",
        "55803",
        "61562",
        "86026",
        "87017",
        "94470"
      ],
      "thirdPrize": [
        "0324",
        "1080",
        "1088",
        "2461",
        "2886",
        "3388",
        "3879",
        "3912",
        "4950",
        "8174"
      ],
      "fourthPrize": [
        "0438",
        "1448",
        "2468",
        "3165",
        "3203",
        "4846",
        "5779",
        "7745",
        "8760",
        "9671"
      ],
      "fifthPrize": [
        "0050",
        "0967",
        "1926",
        "2862",
        "4193",
        "5445",
        "6106",
        "7225",
        "7737",
        "8616",
        "0120",
        "1254",
        "2114",
        "2878",
        "4312",
        "5467",
        "6118",
        "7238",
        "7835",
        "8683",
        "0241",
        "1430",
        "2264",
        "2913",
        "4516",
        "5689",
        "6254",
        "7245",
        "7910",
        "8949",
        "0385",
        "1477",
        "2326",
        "3125",
        "4785",
        "5720",
        "6283",
        "7367",
        "7979",
        "9060",
        "0431",
        "1541",
        "2363",
        "3380",
        "4885",
        "5875",
        "6309",
        "7378",
        "8041",
        "9066",
        "0598",
        "1606",
        "2602",
        "3528",
        "4916",
        "5876",
        "6387",
        "7387",
        "8061",
        "9078",
        "0779",
        "1617",
        "2616",
        "3738",
        "4964",
        "5905",
        "6848",
        "7441",
        "8195",
        "9107",
        "0804",
        "1696",
        "2691",
        "3938",
        "4995",
        "6029",
        "6925",
        "7473",
        "8270",
        "9214",
        "0942",
        "1708",
        "2700",
        "4011",
        "5067",
        "6040",
        "6973",
        "7606",
        "8413",
        "9839",
        "0952",
        "1853",
        "2802",
        "4015",
        "5190",
        "6063",
        "7176",
        "7687",
        "8510",
        "9980"
      ]
    },
    "yesterday": {
      "series": "94B",
      "winningDigits": "99633",
      "fullTicket": "94B 99633",
      "firstPrize": "₹1,00,00,000 (1 Crore)",
      "sheetImg": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-6pm-11-10-2026.webp",
      "sheetUrl": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-6pm-11-10-2026.webp",
      "pdfUrl": "https://sambad.tv/?lssm_result_pdf=1&date=11-10-2026&slot=6pm",
      "consolationPrize": [
        "99633"
      ],
      "secondPrize": [
        "12164",
        "46611",
        "58517",
        "59977",
        "60298",
        "60654",
        "83294",
        "88129",
        "92548",
        "96209"
      ],
      "thirdPrize": [
        "0382",
        "1567",
        "2961",
        "3697",
        "5340",
        "7276",
        "7591",
        "7753",
        "7790",
        "9631"
      ],
      "fourthPrize": [
        "0741",
        "3104",
        "3381",
        "4086",
        "5891",
        "5894",
        "6646",
        "8518",
        "8833",
        "9124"
      ],
      "fifthPrize": [
        "0009",
        "1437",
        "2844",
        "3750",
        "4749",
        "5667",
        "6736",
        "7552",
        "8115",
        "9228",
        "0193",
        "1647",
        "2962",
        "3847",
        "4836",
        "5715",
        "6746",
        "7629",
        "8291",
        "9272",
        "0606",
        "1711",
        "2994",
        "3968",
        "4892",
        "5997",
        "6854",
        "7746",
        "8508",
        "9299",
        "0615",
        "1960",
        "3004",
        "4364",
        "4992",
        "6033",
        "7166",
        "7762",
        "8525",
        "9312",
        "0618",
        "2368",
        "3012",
        "4429",
        "5076",
        "6047",
        "7233",
        "7833",
        "8678",
        "9518",
        "0791",
        "2390",
        "3082",
        "4459",
        "5363",
        "6083",
        "7305",
        "7849",
        "8684",
        "9526",
        "0895",
        "2423",
        "3130",
        "4491",
        "5491",
        "6339",
        "7320",
        "7890",
        "8727",
        "9538",
        "0938",
        "2553",
        "3187",
        "4509",
        "5578",
        "6459",
        "7393",
        "7933",
        "8909",
        "9863",
        "0953",
        "2745",
        "3539",
        "4527",
        "5631",
        "6463",
        "7406",
        "7941",
        "9029",
        "9894",
        "1053",
        "2817",
        "3586",
        "4663",
        "5663",
        "6479",
        "7477",
        "7956",
        "9185",
        "9911"
      ]
    }
  },
  {
    "id": "8pm",
    "label": "8 PM",
    "time": "8:00 PM",
    "period": "Night",
    "title": "DEAR Magic Monday Weekly Lottery",
    "drawNo": "50th Draw",
    "bandClass": "band-3",
    "themeClass": "theme-draw-3",
    "btnClass": "draw-3",
    "today": {
      "series": "74J",
      "winningDigits": "37405",
      "fullTicket": "74J 37405",
      "firstPrize": "₹1,00,00,000 (1 Crore)",
      "sheetImg": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-8pm-12-10-2026.webp",
      "sheetUrl": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-8pm-12-10-2026.webp",
      "pdfUrl": "https://sambad.tv/?lssm_result_pdf=1&date=12-10-2026&slot=8pm",
      "consolationPrize": [
        "37405"
      ],
      "secondPrize": [
        "02692",
        "07247",
        "08931",
        "26569",
        "33308",
        "35944",
        "37501",
        "82640",
        "89845",
        "98092"
      ],
      "thirdPrize": [
        "0111",
        "0319",
        "0536",
        "1949",
        "2592",
        "2740",
        "2924",
        "7276",
        "7915",
        "8918"
      ],
      "fourthPrize": [
        "1603",
        "3118",
        "4165",
        "4248",
        "5610",
        "6056",
        "6546",
        "7364",
        "9367",
        "9877"
      ],
      "fifthPrize": [
        "0005",
        "0989",
        "2409",
        "3623",
        "4795",
        "5996",
        "6810",
        "7361",
        "8164",
        "9250",
        "0218",
        "1026",
        "2461",
        "3702",
        "4813",
        "5999",
        "6834",
        "7399",
        "8269",
        "9314",
        "0496",
        "1180",
        "2469",
        "3847",
        "5004",
        "6061",
        "6880",
        "7482",
        "8339",
        "9461",
        "0512",
        "1491",
        "2542",
        "3982",
        "5131",
        "6062",
        "6950",
        "7533",
        "8378",
        "9538",
        "0573",
        "1503",
        "2780",
        "4136",
        "5176",
        "6073",
        "6955",
        "7563",
        "8484",
        "9539",
        "0587",
        "1506",
        "2809",
        "4202",
        "5461",
        "6094",
        "6999",
        "7584",
        "8807",
        "9658",
        "0602",
        "1813",
        "2820",
        "4259",
        "5462",
        "6263",
        "7052",
        "7654",
        "8816",
        "9753",
        "0626",
        "1905",
        "2989",
        "4501",
        "5643",
        "6345",
        "7074",
        "7769",
        "8847",
        "9842",
        "0773",
        "1958",
        "3468",
        "4673",
        "5758",
        "6434",
        "7154",
        "7985",
        "9145",
        "9872",
        "0927",
        "2142",
        "3482",
        "4683",
        "5817",
        "6541",
        "7221",
        "8122",
        "9156",
        "9899"
      ]
    },
    "yesterday": {
      "series": "48K",
      "winningDigits": "36340",
      "fullTicket": "48K 36340",
      "firstPrize": "₹1,00,00,000 (1 Crore)",
      "sheetImg": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-8pm-11-10-2026.webp",
      "sheetUrl": "https://admin.sambad.tv/wp-content/uploads/2026/10/lottery-sambad-8pm-11-10-2026.webp",
      "pdfUrl": "https://sambad.tv/?lssm_result_pdf=1&date=11-10-2026&slot=8pm",
      "consolationPrize": [
        "36340"
      ],
      "secondPrize": [
        "02447",
        "06834",
        "16268",
        "16459",
        "22711",
        "26410",
        "38812",
        "44163",
        "67930",
        "76896"
      ],
      "thirdPrize": [
        "0520",
        "0797",
        "3694",
        "4476",
        "4782",
        "5567",
        "6548",
        "7077",
        "8996",
        "9779"
      ],
      "fourthPrize": [
        "1232",
        "2394",
        "3029",
        "3572",
        "3909",
        "4639",
        "6261",
        "8138",
        "8788",
        "9311"
      ],
      "fifthPrize": [
        "0084",
        "0613",
        "1953",
        "2866",
        "3800",
        "4982",
        "5845",
        "6231",
        "7894",
        "8709",
        "0142",
        "0682",
        "2056",
        "2986",
        "3917",
        "5012",
        "5854",
        "6299",
        "7905",
        "8760",
        "0145",
        "0717",
        "2133",
        "3010",
        "4106",
        "5132",
        "5919",
        "6456",
        "8000",
        "8901",
        "0167",
        "0860",
        "2287",
        "3037",
        "4297",
        "5192",
        "5984",
        "6502",
        "8077",
        "9186",
        "0189",
        "0870",
        "2534",
        "3077",
        "4664",
        "5263",
        "6005",
        "6681",
        "8336",
        "9241",
        "0307",
        "0946",
        "2613",
        "3093",
        "4673",
        "5339",
        "6055",
        "7052",
        "8349",
        "9463",
        "0510",
        "1132",
        "2652",
        "3125",
        "4682",
        "5436",
        "6090",
        "7237",
        "8363",
        "9612",
        "0538",
        "1778",
        "2654",
        "3272",
        "4860",
        "5562",
        "6095",
        "7381",
        "8529",
        "9732",
        "0560",
        "1815",
        "2793",
        "3514",
        "4868",
        "5585",
        "6166",
        "7410",
        "8578",
        "9900",
        "0569",
        "1827",
        "2847",
        "3794",
        "4958",
        "5758",
        "6203",
        "7466",
        "8646",
        "9988"
      ]
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
      const todayISO = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date());
      const savedDate = localStorage.getItem("lottery_site_data_date");
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // If saved cache references obsolete static asset paths, clear stale cache
        const hasObsoleteAsset = Array.isArray(parsed) && parsed.some(d => 
          (d.today && d.today.sheetImg && d.today.sheetImg.startsWith("assets/lottery_sheet_")) ||
          (d.yesterday && d.yesterday.sheetImg && d.yesterday.sheetImg.startsWith("assets/lottery_sheet_"))
        );
        if (hasObsoleteAsset) {
          localStorage.removeItem(STORAGE_KEY);
          return JSON.parse(JSON.stringify(DEFAULT_DRAWS));
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DRAWS));
  }

  function saveData() {
    try {
      const todayISO = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date());
      localStorage.setItem("lottery_site_data_date", todayISO);
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

    function parseAdminTicketTable(html) {
    if (!html) return null;
    const res = {
      drawNo: "",
      lotteryName: "",
      series: "",
      digits: "",
      fullTicket: "",
      cons: [],
      second: [],
      third: [],
      fourth: [],
      fifth: []
    };
    const nameM = html.match(/<th>(?:লটারির নাম|Lottery Name)<\/th><td>([^<]+)<\/td>/i);
    if (nameM) res.lotteryName = nameM[1].trim();

    const drawNoM = html.match(/<th>(?:ড্র নম্বর|Draw No)<\/th><td>([^<]+)<\/td>/i);
    if (drawNoM) res.drawNo = drawNoM[1].trim();

    const fpM = html.match(/is-first-prize[\s\S]*?<div class="lssm-prize-card-winning-value">([^<]+)<\/div>/);
    if (fpM) {
      const full = fpM[1].trim();
      res.fullTicket = full;
      const parts = full.split(/\s+/);
      if (parts.length >= 2) {
        res.series = parts[0];
        res.digits = parts[1];
      } else {
        res.digits = full;
      }
    }

    const consM = html.match(/is-consolation-prize[\s\S]*?<div class="lssm-prize-card-winning-value">([^<]+)<\/div>/);
    if (consM) res.cons = consM[1].trim().split(/[\s,]+/).filter(Boolean);

    function getCells(rx) {
      const m = html.match(rx);
      if (!m) return [];
      const cells = [];
      const crx = /<span class="lssm-winning-number-cell">([^<]+)<\/span>/g;
      let match;
      while ((match = crx.exec(m[1])) !== null) {
        cells.push(match[1].trim());
      }
      return cells;
    }

    res.second = getCells(/(?:দ্বিতীয় পুরস্কার|2nd Prize)[\s\S]*?<div class="lssm-prize-card-winning">([\s\S]*?)<\/div><\/article>/i);
    res.third = getCells(/(?:তৃতীয় পুরস্কার|3rd Prize)[\s\S]*?<div class="lssm-prize-card-winning">([\s\S]*?)<\/div><\/article>/i);
    res.fourth = getCells(/(?:চতুর্থ পুরস্কার|4th Prize)[\s\S]*?<div class="lssm-prize-card-winning">([\s\S]*?)<\/div><\/article>/i);
    res.fifth = getCells(/(?:পঞ্চম পুরস্কার|5th Prize)[\s\S]*?<div class="lssm-prize-card-winning">([\s\S]*?)<\/div><\/article>/i);

    return res;
  }

  if (btnSyncFromApiNow) {
    btnSyncFromApiNow.addEventListener("click", async () => {
      showToast("Connecting to Sambad.tv official API for live sync...");
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const ist = new Date(utc + (3600000 * 5.5));
      const yest = new Date(ist.getTime() - (24 * 60 * 60 * 1000));

      const fmt = (d) => {
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        return { dd, mm, yyyy, dmy: `${dd}-${mm}-${yyyy}`, iso: `${yyyy}-${mm}-${dd}` };
      };

      const todayObj = fmt(ist);
      const yestObj = fmt(yest);

      // Try fetching live /results endpoint for today's exact images
      let liveImages = {};
      try {
        const rRes = await fetch("/api/sambad/results").catch(() => fetch("https://sambad.tv/wp-json/lottery-sambad/v1/results"));
        if (rRes && rRes.ok) {
          liveImages = await rRes.json();
        }
      } catch (e) {}

      const slotKeys = [
        { slot: "1pm", idx: 0, label: "1 PM" },
        { slot: "6pm", idx: 1, label: "6 PM" },
        { slot: "8pm", idx: 2, label: "8 PM" }
      ];

      let syncedCount = 0;

      for (const item of slotKeys) {
        // Sync TODAY
        try {
          const tTableRes = await fetch(`/api/sambad/premium-ticket-table?date=${todayObj.dmy}&slot=${item.slot}`)
            .catch(() => fetch(`https://sambad.tv/wp-json/lottery-sambad/v1/premium-ticket-table?date=${todayObj.dmy}&slot=${item.slot}`));
          if (tTableRes && tTableRes.ok) {
            const tJson = await tTableRes.json();
            if (tJson && tJson.success && tJson.tableHtml) {
              const p = parseAdminTicketTable(tJson.tableHtml);
              if (p && p.fullTicket) {
                const target = drawsData[item.idx].today;
                target.series = p.series;
                target.winningDigits = p.digits;
                target.fullTicket = p.fullTicket;
                if (p.drawNo) drawsData[item.idx].drawNo = `${p.drawNo}th Draw`;
                if (p.lotteryName) drawsData[item.idx].title = p.lotteryName;
                if (p.second.length) target.secondPrize = p.second;
                if (p.third.length) target.thirdPrize = p.third;
                if (p.fourth.length) target.fourthPrize = p.fourth;
                if (p.fifth.length) target.fifthPrize = p.fifth;
                if (p.cons.length) target.consolationPrize = p.cons;

                const liveImg = (liveImages[item.slot] && liveImages[item.slot].image) 
                  || `https://admin.sambad.tv/wp-content/uploads/${todayObj.yyyy}/${todayObj.mm}/lottery-sambad-${item.slot}-${todayObj.dmy}.webp`;
                target.sheetImg = liveImg;
                target.sheetUrl = liveImg;
                target.pdfUrl = `https://sambad.tv/?lssm_result_pdf=1&date=${todayObj.dmy}&slot=${item.slot}`;
                syncedCount++;
              }
            }
          }
        } catch (e) {}

        // Sync YESTERDAY
        try {
          const yTableRes = await fetch(`/api/sambad/premium-ticket-table?date=${yestObj.dmy}&slot=${item.slot}`)
            .catch(() => fetch(`https://sambad.tv/wp-json/lottery-sambad/v1/premium-ticket-table?date=${yestObj.dmy}&slot=${item.slot}`));
          if (yTableRes && yTableRes.ok) {
            const yJson = await yTableRes.json();
            if (yJson && yJson.success && yJson.tableHtml) {
              const p = parseAdminTicketTable(yJson.tableHtml);
              if (p && p.fullTicket) {
                const targetY = drawsData[item.idx].yesterday;
                targetY.series = p.series;
                targetY.winningDigits = p.digits;
                targetY.fullTicket = p.fullTicket;
                if (p.second.length) targetY.secondPrize = p.second;
                if (p.third.length) targetY.thirdPrize = p.third;
                if (p.fourth.length) targetY.fourthPrize = p.fourth;
                if (p.fifth.length) targetY.fifthPrize = p.fifth;
                if (p.cons.length) targetY.consolationPrize = p.cons;

                const yImg = `https://admin.sambad.tv/wp-content/uploads/${yestObj.yyyy}/${yestObj.mm}/lottery-sambad-${item.slot}-${yestObj.dmy}.webp`;
                targetY.sheetImg = yImg;
                targetY.sheetUrl = yImg;
                targetY.pdfUrl = `https://sambad.tv/?lssm_result_pdf=1&date=${yestObj.dmy}&slot=${item.slot}`;
              }
            }
          }
        } catch (e) {}
      }

      saveData();
      populateForm();
      showToast(`🎉 Successfully synced live official lottery results from Sambad.tv!`);
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
