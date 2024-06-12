const body = document.body
const insertBtn = document.getElementById('insert-btn');
const stockBtn = document.getElementById('stock-btn');
let stok = 0;
let sttok = 0;
let hasil = parseInt(0);

function boxEnqueue(){
    var boxEnq = document.createElement('div');
    boxEnq.className = 'box-enqueue';
    boxEnq.id = 'box-enq';

    var inputNama = document.createElement('input');
    inputNama.type = 'text';
    inputNama.id = 'Name';
    inputNama.placeholder = '名前 (Name)';

    var inputPesanan = document.createElement('input');
    inputPesanan.type = 'number';
    inputPesanan.id = 'Order';
    inputPesanan.placeholder = '注文数 (ORDER QUANTITY)';

    var buttonq = document.createElement('button');
    buttonq.className = 'input-q';
    buttonq.id = 'btn-input-q';
    buttonq.addEventListener('click', enqueue);
    buttonq.textContent = 'にゅうりょく (input)';

    var cancelqBtn = document.createElement('button');
    cancelqBtn.className = 'cancel-q';
    cancelqBtn.id = 'btn-cancel-q';
    cancelqBtn.addEventListener('click', cancelq);
    cancelqBtn.textContent = 'とりけし (cancel)';

    boxEnq.appendChild(inputNama);
    boxEnq.appendChild(inputPesanan);
    boxEnq.appendChild(buttonq);
    boxEnq.appendChild(cancelqBtn);

    body.append(boxEnq);

    insertBtn.disabled = true;
}

function cancelq(){
    var boxEnq = document.getElementById('box-enq');
    if (boxEnq) {
        boxEnq.parentNode.removeChild(boxEnq);
    }

    insertBtn.disabled = false;
}

let nomer = 1;
function enqueue() {
    var tblbody = document.getElementById('bodytbl');
    var baris = document.createElement('tr');
    var boxEnq = document.getElementById('box-enq');

    var inputNama = document.getElementById('Name');
    var inputOrder = document.getElementById('Order');
    
    var nama = inputNama.value;
    var order = inputOrder.value;

    if(stok < order){
        var sound3 = new Audio();
        sound3.src = "hover-sound3.mp3";
        sound3.onerror = function() {
            console.error("Failed to load sound3.");
        };
        sound3.play().catch(error => {
            console.error("Failed to play sound3:", error);
        });
        alert('gomen stok saat ini tidak cukup desu, stok saat ini masih  ' + stok + ' desu')
    }else{
        if(nama === '' || order === ''){
            var sound3 = new Audio();
            sound3.src = "hover-sound3.mp3";
            sound3.onerror = function() {
                console.error("Failed to load sound3.");
            };
            sound3.play().catch(error => {
                console.error("Failed to play sound3:", error);
            });
            alert("isi dulu, onee chan >_<");
            return;
        }else{
            var col1 = document.createElement('td');
            col1.textContent = nomer + ".";
            nomer++;
            baris.appendChild(col1);

            var col2 = document.createElement('td');
            col2.textContent = nama;
            baris.appendChild(col2);

            var col3 = document.createElement('td');
            col3.textContent = order;
            baris.appendChild(col3);

            var col4 = document.createElement('td');
            col4.textContent = '';
            baris.appendChild(col4);

            tblbody.appendChild(baris);

            document.getElementById('Name').value = '';
            document.getElementById('Order').value = '';

            boxEnq.parentNode.removeChild(boxEnq);

            stok = stok - order;

            hasil = parseInt(hasil) + parseInt(order);

            insertBtn.disabled = false;

            document.getElementById('tampil-stok').innerHTML=stok;

        }
    }
}

function dequeue(){
    var tblbody = document.getElementById('bodytbl');
    if (tblbody.children.length === 0){
        var sound3 = new Audio();
        sound3.src = "hover-sound3.mp3";
        sound3.onerror = function() {
            console.error("Failed to load sound3.");
        };
        sound3.play().catch(error => {
            console.error("Failed to play sound3:", error);
        });
        alert("Antrian kosong dattebayo")
    }else{
        tblbody.removeChild(tblbody.children[0]);
        nomer--;
        updateNomer();
    }
}

function updateNomer(){
    var tblbody = document.getElementById('bodytbl');
    var rows = tblbody.children;
    for (var i = 0; i < rows.length; i++) {
        rows[i].children[0].textContent = i + 1;
    }
}

function clearAll(){
    var tblbody = document.getElementById('bodytbl');
    tblbody.innerHTML = '';
    nomer = 1;
}

function boxAddStock(){
    var boxStk = document.createElement('div');
    boxStk.className = 'box-Stock';
    boxStk.id = 'box-stk';

    var inputStock = document.createElement('input');
    inputStock.type = 'number';
    inputStock.id = 'Stock';
    inputStock.placeholder = 'ストックをついか (add stock)';

    var buttonst = document.createElement('button');
    buttonst.className = 'input-stok';
    buttonst.id = 'btn-input-stok';
    buttonst.addEventListener('click', addStok);
    buttonst.textContent = 'ついか (add)';

    var cancels = document.createElement('button');
    cancels.className = 'cancel-stok';
    cancels.id = 'btn-cancel-stok';
    cancels.addEventListener('click', cancelStock);
    cancels.textContent = 'とりけし (cancel)';

    boxStk.appendChild(inputStock);
    boxStk.appendChild(buttonst);
    boxStk.appendChild(cancels);
    
    
    body.append(boxStk);

    stockBtn.disabled = true;
}

function cancelStock(){
    var boxS = document.getElementById('box-stk');
    if (boxS) {
        boxS.parentNode.removeChild(boxS);
    }

    stockBtn.disabled = false;
}

function addStok(){
    var boxS = document.getElementById('box-stk');
    var inputAdd = document.getElementById('Stock');

    var Add = parseInt(inputAdd.value);
    stok = stok + Add;

    if (!isNaN(Add) && Add >= 0) {
        alert('Stok berhasil ditambahkan desu. Stok saat ini : ' + stok);
        document.getElementById('tampil-stok').innerHTML=stok;
    } else {
        var sound3 = new Audio();
        sound3.src = "hover-sound3.mp3";
        sound3.onerror = function() {
            console.error("Failed to load sound3.");
        };
        sound3.play().catch(error => {
            console.error("Failed to play sound3:", error);
        });
        alert('salah bang, gak valid');
    }

    boxS.parentNode.removeChild(boxS);
    stockBtn.disabled = false;
}

function endProgram() {


    // Panggil fungsi untuk menampilkan hasil penjualan
    displaySalesResult();
    
    // Lakukan tindakan lain yang diperlukan saat mengakhiri program
}

function displaySalesResult() {
    var tblbody = document.getElementById('bodytbl');
    var rows = tblbody.children;
    var totalSales = 0;

    // Loop melalui setiap baris tabel untuk menghitung total penjualan
    for (var i = 0; i < rows.length; i++) {
        var orderCell = rows[i].children[2];
        var orderQuantity = parseInt(orderCell.textContent);
    }

    // Tampilkan hasil penjualan
    alert('今日の売上合計は (Total penjualan) : ' + hasil);
    alert('Terimakasih atas kerja kerasnya onee-chan //>.<//');
    alert('お姉ちゃん、お疲れ様でした //>.<//');
}

var sound3 = document.getElementById('sound3');

var isPlaying = false;

function toggleSound() {
    if (isPlaying) {
        sound3.pause();
        sound3.currentTime = 0; 
    } else {
        sound3.play();
    }
    isPlaying = !isPlaying; 
}
