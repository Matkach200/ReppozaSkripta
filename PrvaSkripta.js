let RedniBroj = prompt("Upiši redni broj tužbe");
let URLovi = [];
let openedWindows=[];
let pristignuliPodaci=[];
let PunaTablica='';
let arrayProzora=[];
let arrayTablica=[];
let clickCount = 0;
let scriptUrl="https://raw.githubusercontent.com/Matkach200/ReppozaSkripta/refs/heads/main/script.js";
function UpdateajGumb(){
const gumb=document.getElementById('finishedButton');
const kvacice = document.querySelectorAll('.rowCheckbox:checked').length;
gumb.textContent = gumb.textContent.replace(/\d+/,kvacice);}
function fetchAndEvalScript(prozor) {
    fetch(scriptUrl)
        .then(response => response.text())
        .then(scriptContent => {
            prozor.eval(scriptContent);
        })
        .catch(error => console.error('Error fetching or executing the script:', error));
}
function LoadajJSip(){
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js';
document.head.appendChild(script);
script.onload = function() {
    console.log('JSZip loaded successfully');
};	
}
function NapraviKvacice(){
const rows = document.querySelectorAll('.dataGridLinkRow');
rows.forEach(row => {
  // Create a new checkbox element
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'rowCheckbox';  // Add a class to the checkbox if needed
  // Insert the checkbox at the beginning of the row (in the first cell)
  const firstCell = row.querySelector('td');
  if (firstCell) {
    const gumbovi = firstCell.insertBefore(checkbox, firstCell.firstChild);
    gumbovi.addEventListener('change', () => {
        UpdateajGumb();
    });
  }

  // Add event listener to stop propagation of the click event
  checkbox.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevent the parent row's onclick from being triggered
  });
});

// Create the button with a tick icon and text
const button = document.createElement('button');
button.id = 'finishedButton';
button.style.display = 'inline-flex';
button.style.alignItems = 'center';
button.style.padding = '5px 10px';
button.style.border = '1px solid #ccc';
button.style.cursor = 'pointer';
button.style.fontSize = '16px';
// Create the tick icon (✓)
const tickIcon = document.createElement('span');
tickIcon.innerHTML = '&#10003;';  // The tick mark symbol (✓)
tickIcon.style.fontSize = '20px';
tickIcon.style.color = 'gray';  // Initially gray
// Create the text next to the tick icon
const buttonText = document.createElement('span');
buttonText.innerText = 'Jesi li završio/la s odabirom? - 0';
buttonText.style.marginLeft = '10px';
// Append the tick icon and text to the button
button.appendChild(tickIcon);
button.appendChild(buttonText);
button.addEventListener('click', (event) => {
clickCount++;
event.stopPropagation(); 
event.preventDefault();
if(clickCount>1){URLovi = [];}
continueWithScript();
// Prevent the parent row's onclick from being triggered
  });
const GlavniGumb = document.getElementById('ctl00_ContentPlaceHolder1_ReportsData1_btlConditions').insertBefore(button,document.querySelector('#ctl00_ContentPlaceHolder1_ReportsData1_btlConditions > li'));

}


async function continueWithScript() {
const kvacice = document.querySelectorAll('.rowCheckbox');
let poklikani = [];
kvacice.forEach(jes =>{
if(jes && jes.checked ){poklikani.push(jes)}
})
poklikani.forEach(url => {
URLovi.push(url.closest('tr').getAttribute('onclick').match(/window\.open\(['"](.+?)['"]/)[1]);
})
openedWindows = URLovi.map(url => window.open(url, '_blank'));

openedWindows.forEach(prozor => {
    setTimeout(() => {
        fetchAndEvalScript(prozor);
        prozor.console.log("Loadano");
    }, 6000);  // Waits for 3 seconds before executing
});


    window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) {
            console.error('Poruka s krivog ishodista', event.origin);
            return;
        }
        pristignuliPodaci.push(event.data);
		const pristignuliProzor=event.source;
		const kljuc2=pristignuliProzor.document.getElementById('ctl00_ContentPlaceHolder1_apDetails_header_lblDetails').textContent;
		arrayTablica.push(pristignuliProzor.sessionStorage.getItem(kljuc2));
		arrayProzora.push(pristignuliProzor);
	  pristignuliProzor.close();
		console.log("Dosao podatak");
        if (pristignuliPodaci.length === openedWindows.length) {
            spojiSve(pristignuliPodaci);
        }
    });  // Delay is passed as an integer, not a string



}
async function spojiSve(blobovi){
const JSZip = window.JSZip;
const ZadnjiZIP = new JSZip();
const parentDir = ZadnjiZIP.folder(RedniBroj);
 for (let i = 0; i < blobovi.length; i++) {
        const zipBlob = blobovi[i];
        
        try {
            const zip = await JSZip.loadAsync(zipBlob);

            // Create an array of promises for processing each file
            const filePromises = Object.keys(zip.files).map(async (relativePath) => {
                const file = zip.files[relativePath];

                if (!file.dir) { 
                    const fileData = await file.async('blob');
                    parentDir.file(relativePath, fileData);  // Add file with its relative path
                } else {
                    parentDir.folder(relativePath);  // Create folder to preserve structure
                }
            });

            // Wait for all file operations to complete for the current zip
            await Promise.all(filePromises);

        } catch (error) {
            console.error(`Error loading ZIP blob ${i + 1}:`, error);
        }
    }
const Tablica=spojiSveTablice();
const ImePrezime = openedWindows[0].document.getElementById('ctl00_ContentPlaceHolder1_apDetails_content_ucContactInfo_lblImePrezimePodatak').textContent.replace(' ','_');
	parentDir.file(RedniBroj+" "+ImePrezime+".xls",Tablica);
const merganiZip = await ZadnjiZIP.generateAsync({ type: 'blob' });
// Create a temporary URL for the Blob
    const url = URL.createObjectURL(merganiZip);
    // Programmatically create an anchor element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = ImePrezime;  // Specify the file name
    a.style.display = 'none';   // Make sure it's not visible
    document.body.appendChild(a); // Append the anchor to the body (this is temporary)
    a.click();  // Simulate the click to trigger the download
    document.body.removeChild(a);  // Remove the anchor from the DOM

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(url);


}
function spojiSveTablice(){
let blob;
arrayTablica.forEach(prozor => {
PunaTablica=PunaTablica.concat(prozor);
let html = `
                <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
                <head><meta charset="UTF-8"></head>
                <body>` + PunaTablica + `</body></html>`;
	blob = new Blob([html], {
		type: "application/vnd.ms-excel"
	});
	
})
return blob;
}
LoadajJSip();
NapraviKvacice();
