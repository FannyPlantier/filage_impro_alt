document.addEventListener('DOMContentLoaded', function() {
    let data = [];

    document.getElementById('fileInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const arrayBuffer = e.target.result;
                
                if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                } else if (fileExtension === 'ods') {
                    ODS.parse(arrayBuffer, function(result) {
                        data = result.data;
                    });
                } else if (fileExtension === 'csv') {
                    const lines = text.split('\n');
                    const headers = lines[0].split(',');
                    const data = lines.slice(1).map(line => {
                        const values = line.split(',');
                        return headers.reduce((obj, header, index) => {
                            obj[header] = values[index];
                            return obj;
                        }, {});
                    });
                    return data;

                } else {
                    console.error('Format de fichier non supporté');
                    return;
                }
                
                document.getElementById('output').textContent = JSON.stringify(data, null, 2);
            };
            
            reader.readAsArrayBuffer(file);
        }
    });
});