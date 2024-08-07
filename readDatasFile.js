let data = [];

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const reader = new FileReader();
            
            reader.onload = function(e) {
                let arrayBuffer = e.target.result;
                if(fileExtension === 'csv'){
                    arrayBuffer = new Uint8Array(arrayBuffer);
                }
                
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                data = XLSX.utils.sheet_to_json(worksheet);  
                console.log(JSON.stringify(data));
                // document.getElementById('output').textContent = JSON.stringify(data, null, 2);
            }
                
        reader.readAsArrayBuffer(file);
        };
    });
});