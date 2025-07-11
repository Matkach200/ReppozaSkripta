//document.addEventListener("DOMContentLoaded", function() {
let URLovi = [];
function okreniStringiSplitaj(string){
  let obrnuto = string.split("").reverse().join("");
  let prviDio = obrnuto.split(/\\/)[0];
  let noviString = prviDio.split("").reverse().join("");
  return noviString;


}
function DodajJSZip() {
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js";
  document.head.appendChild(script);
  script.onload = function () {
    console.log("JSZip loaded successfully");
  };
}
DodajJSZip();
async function TablicaExport() {
  return new Promise((resolve) => {let allRows = [];
let flag = 0; // Initialize flag globally
let sirina;
let trenutnaStr;

if (document.querySelector('.paging')) {
	sirina = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr.paging > td > table > tbody > tr').querySelectorAll('td').length; // Use the global sirina
} else {
	sirina = 1; // Modify the global sirina, don't redeclare with let
	flag = 1; // Modify the global flag
}

let Finalni = [];
let DodPod = [];

function DuplicirajStupceIRetke(prefiks, sufiks) {
	for (let i = 0; i < prefiks.length; i++) {
		const kopija = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr.header > th:nth-child(4)').cloneNode(true);
		const kopija2 = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr.header').appendChild(kopija);
		kopija2.textContent = prefiks[i];
	}
	for (let i = 0; i < sufiks.length; i++) {
		const kopija = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr:nth-child(2) > td:nth-child(4)').cloneNode(true);
		const kopija2 = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr:nth-child(2)').appendChild(kopija);
		kopija2.textContent = sufiks[i];
	}
	PopuniRedove(sufiks);
}

function PopuniRedove(sufiks) {
	const red = document.querySelectorAll('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr:nth-child(2) > td');
	for (let i = 4; i < red.length; i++) {
		red[i].textContent = sufiks[i - 4];
	}
	DodajOpisILink();
}

function popuniDodatne() {
	let Prefiks = [];
	let Sufiks = [];
	DodPod.push(document.getElementById('ctl00_ContentPlaceHolder1_apDetails_header_lblDetails').textContent);
	let VrKontSkup = document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblVrstaKontakta').textContent.concat(document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblVrstaKontakta').nextElementSibling.textContent);
	DodPod.push(VrKontSkup);
	VrKontSkup = document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblOib').textContent.concat(document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblOib').nextElementSibling.textContent);
	DodPod.push(VrKontSkup);
	VrKontSkup = document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblImePrezime').textContent.concat(document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblImePrezime').nextElementSibling.textContent);
	DodPod.push(VrKontSkup);
	VrKontSkup = document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblVrijemeKontakta').textContent.concat(document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblVrijemeKontakta').nextElementSibling.textContent);
	DodPod.push(VrKontSkup);
	VrKontSkup = document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_txtOpis_ctl02_ctl02').contentDocument.querySelector('body').textContent;
	DodPod.push(VrKontSkup);
	for (let i = 0; i < DodPod.length - 1; i++) {
		Prefiks.push(DodPod[i].split(':')[0]);
		Sufiks.push(DodPod[i].split(':')[1]);
	}
	DuplicirajStupceIRetke(Prefiks, Sufiks);
}

function StrukturirajTablicu() {
	popuniDodatne();

}

function DodajOpisILink() {
	const kopija = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr.header > th:nth-child(4)').cloneNode(true);
	const kopija2 = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr.header').appendChild(kopija);
	kopija2.textContent = "Prvi Opis";
	const kopija3 = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr:nth-child(2) > td:nth-child(4)').cloneNode(true);
	const kopija4 = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr:nth-child(2)').appendChild(kopija3);
	kopija4.textContent = document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_txtOpis_ctl02_ctl02').contentDocument.querySelector('body').textContent;
	const kopija5 = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody > tr:nth-child(2)').cloneNode();
	const prvoDijete = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody').firstElementChild;
	const novo = prvoDijete.parentNode.insertBefore(kopija5, prvoDijete);
	let anchor = document.createElement('a');
	anchor.href = window.location.href;

	while (novo.firstChild) {
		anchor.appendChild(novo.firstChild);
	}
	novo.appendChild(anchor);
	novo.querySelector('a').textContent = window.location.href;
}

function UhvatiSveNaStranici() {
	let trenutnaStr;
	if (flag !== 1) {
		trenutnaStr = document.querySelector('.paging').querySelector('tbody > tr > td > span').textContent; // Assign value
	} else {
		trenutnaStr = '1'; // Make sure trenutnaStr is correctly assigned as '1' for the flag case
	}

	// Now check the value of trenutnaStr properly
	if (trenutnaStr == '1') {
		// Grab all .row, .altrow, and .header rows when trenutnaStr is '1'
		const rows = document.getElementById('ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal').querySelectorAll('.row, .altrow, .header');
		Array.from(rows).forEach(row => {
			allRows.push(row.outerHTML);
		});
	} else {
		// For other pages, grab only .row and .altrow, skipping .header
		const rows = document.getElementById('ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal').querySelectorAll('.row, .altrow');
		Array.from(rows).forEach(row => {
			allRows.push(row.outerHTML.replace(/\n+/g, ''));
		});
	}
}

function generateHTMLTable() {
	return `<table>${allRows.join('')}</table>`;
}

function idiNaSljedecu() {
  if (flag == 1) return false;

  const currentPageSpan = document.querySelector('.paging tbody tr td span');
  const currentPageNumber = currentPageSpan.textContent.trim();
  if (currentPageNumber == sirina) return false;

  const nextPageLink = currentPageSpan.parentNode.nextElementSibling?.querySelector('a');
  if (nextPageLink) {
    nextPageLink.click();
    return true;
  } else {
    return false;
  }
}


function Downloadaj() {
	let html = `
                <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
                <head><meta charset="UTF-8"></head>
                <body>` + Finalni + `</body></html>`;
	let blob = new Blob([html], {
		type: "application/vnd.ms-excel"
	});
	// Create a link element to download the file
	let a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = 'table_export.xls'; // You can use .xls extension
	a.click(); // Trigger the download


}
function waitForTableToUpdate() {
  return new Promise((resolve) => {
    // Select the table body that updates when navigating pages
    const tableBody = document.querySelector('#ctl00_ContentPlaceHolder1_apJournal_content_ucJournalEntry_grdContactJournal > tbody');

    const observer = new MutationObserver((mutations, obs) => {
      // Check if any rows have been added to the table
      const newRowsAdded = mutations.some(mutation => mutation.addedNodes.length > 0);
      if (newRowsAdded) {
        obs.disconnect();
        resolve();
      }
    });

    // Start observing the table body for changes
    observer.observe(tableBody, { childList: true, subtree: false });

    // Optional timeout to prevent waiting indefinitely
    setTimeout(() => {
      observer.disconnect();
      resolve();
    }, 5000); // Adjust timeout as needed
  });
}
async function UhvatiSve() {
  if (flag == 1) {
    UhvatiSveNaStranici();
    const tsvString = generateHTMLTable();
    Finalni = tsvString.replace(/[\t\n]/g, '');
    const kljuc = document.querySelector('#ctl00_ContentPlaceHolder1_apDetails_header_lblDetails').textContent;
    sessionStorage.setItem(kljuc, Finalni);
    // Downloadaj();
    resolve(); // Ensure 'resolve' is defined in the enclosing scope
  } else {
    UhvatiSveNaStranici();

    const hasNextPage = idiNaSljedecu();
    if (hasNextPage) {
      await waitForTableToUpdate(); // Wait for the table to load
      await UhvatiSve(); // Recursively call UhvatiSve to process the next page
    } else {
      const tsvString = generateHTMLTable();
      Finalni = tsvString.replace(/(\n|\t|<br\s*\/?>)/g, '');
      const kljuc = document.querySelector('#ctl00_ContentPlaceHolder1_apDetails_header_lblDetails').textContent;
      sessionStorage.setItem(kljuc, Finalni);
      // Downloadaj();
      resolve(); // Ensure 'resolve' is defined in the enclosing scope
    }
  }
}
StrukturirajTablicu();
UhvatiSve();})
}
(async () => {
  await TablicaExport();
  SkiniPodatke();
})();
function SkiniPodatke(){
function provjeriZareze(urlovi, mjesec) {
  let flag=0;
  urlovi.forEach((link) => {
    const temp = okreniStringiSplitaj(link);
    if (temp.match(/\%2c/)) {
      flag=1;
      // dodati automatski mail
    };
  });
  if(flag===1)return 0;
  else return 1;
}


// Define the MutationObserver and callback function
function waitForElementToAppear(callback,delay=2000) {
  let timeout;

  const observer = new MutationObserver((mutationsList, observer) => {
    // Check if the target element now exists
    const polje = document.getElementById("ctl00_ContentPlaceHolder1_apAppendFile_content_ucFileUpload_grdFileDocument");
    if (polje) {
      // Stop observing if the element has been found
      observer.disconnect();
      console.log("Target element detected, proceeding with callback.");
      
      // Call the provided callback function
      if (callback) {
        callback(polje);
      }
    }
  });

  // Start observing the parent of the target element or an element
  // that will be modified when the target is added
  const parentElement = document.body;
  if (parentElement) {
    observer.observe(parentElement, { childList: true, subtree: true });
  } else {
    console.error("Parent element not found for mutation observation.");
  }
}

// Define your callback function
waitForElementToAppear((polje) => {
  // Continue with the logic after the target element is found
  const polje2 = polje.querySelectorAll("td > a");
  polje2.forEach((url) => {
    URLovi.push(url.href);
  });
  fetchFilesAndCombine(URLovi);
});

// Now, trigger the mutation by clicking on the relevant element
document.getElementById("ctl00_ContentPlaceHolder1_apAppendFile_header").click();

async function fetchFilesAndCombine(urls) {
  if (urls.length === 0) {
    let brojKontakta = document
      .getElementById("ctl00_ContentPlaceHolder1_apDetails_header_lblDetails")
      .textContent.match(/\d+/g)[0];
    const zip = new JSZip();
    const ParentDir = zip.folder(brojKontakta + "-Prazna reppoza");
    const zipBlob = await zip.generateAsync({ type: "blob" });
    window.opener.postMessage(zipBlob, "https://reppozaebc.sitshr.net:2376/");
  } else {
    //Radimo array sa imenima fileova
    let brojKontakta = document
      .getElementById("ctl00_ContentPlaceHolder1_apDetails_header_lblDetails")
      .textContent.match(/\d+/g)[0];
    let imenaDatoteka = [];
    let mjesec = document
      .getElementById(
        "ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblVrijemeKontaktaPodatak"
      )
      .textContent.match(/(?<=\.\d*)\d+(?=\.)/)[0];    mjesec = mjesec.concat("\\\\");
    if (provjeriZareze(urls, mjesec) === 1) {
      urls.forEach((jedanUrl) => {
        imenaDatoteka.push(okreniStringiSplitaj(jedanUrl));
      });

      try {
        const zip = new JSZip();
        const parentDir = zip.folder(brojKontakta);
        const blobs = [];
        for (let i = 0; i < urls.length; i++) {
          const response = await fetch(urls[i]);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch file from `
            );
          }
          const blob = await response.blob();
          blobs.push(blob);
          parentDir.file(imenaDatoteka[i], blob);
        }
        const zipBlob = await zip.generateAsync({ type: "blob" });
        window.opener.postMessage(
          zipBlob,
          "https://reppozaebc.sitshr.net:2376/"
        );
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    } else {
      const zip = new JSZip();
      let brojKontakta = document
      .getElementById("ctl00_ContentPlaceHolder1_apDetails_header_lblDetails")
      .textContent.match(/\d+/g)[0];
      const ParentDir = zip.folder("GreskaUReppozi-" + brojKontakta);
      const zipBlob = await zip.generateAsync({ type: "blob" });
      window.opener.postMessage(zipBlob, "https://reppozaebc.sitshr.net:2376/");
      alert("Greska u reppozi, treba slati mail!");

    }
  }
}


};
//});
