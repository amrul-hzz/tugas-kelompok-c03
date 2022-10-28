$(document).ready(function(){

    $.get("/create-event/json/", function(data){
        for (i = 0; i < data.length; i++){
            getCard(data[i]);
            deleteCard(data[i]);
        }
    });

    function getCard(data){
        $("#history").append(
            `
            <div id="${data.pk}-card" class="max-w-sm rounded-lg overflow-hidden shadow-lg">
                <img class="w-full" src="${data.fields.fotoPantai}" alt="Mountain">
                <div class="px-6 pt-4">
                    <div class="font-bold text-xl mb-2">${data.fields.namaEvent}</div>
                    <p class="text-gray-700 text-base">
                    ${data.fields.deskripsi}
                    </p>
                </div>
                <div class="flex flex-row justify-center gap-2 pb-3">
                    <a class="cursor-pointer px-5 py-1 font-semibold bg-indigo-500 text-white mt-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Buka</a>
                    <a id="${data.pk}-delete" class="cursor-pointer px-5 py-1 font-semibold border-2 mt-4 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">Hapus</a>
                </div>
            </div>
            `
        );
    }

    function deleteCard(data) {
        $(`#${data.pk}-delete`).click(function () {
            $.post(`/create-event/delete-event/${data.pk}/`, {}).done(
            (card) => {
                $(`#${data.pk}-card`).fadeOut('slow');
            }
            );
        });
    }

    $("#new-task").submit(function(e){
        e.preventDefault();
        $.post("/create-event/add/", { 
            namaEvent: $("#namaEvent").val(), 
            namaPantai: $("#namaPantai").val(),
            alamatPantai: $("#alamatPantai").val(), 
            jumlahPartisipan: $("#jumlahPartisipan").val(),
            fotoPantai: $("#fotoPantai").val(), 
            deskripsi: $("#deskripsi").val(),
            tanggalMulai: $("#tanggalMulai").val(),
            tanggalAkhir: $("#tanggalAkhir").val(),
        }).done(function (data) {
            getCard(data);
            document.getElementById("history").insertAdjacentHTML("beforebegin", $(`#${data.pk}-card`));
            $("#namaEvent").val(""), 
            $("#namaPantai").val(""), 
            $("#alamatPantai").val(""), 
            $("#jumlahPartisipan").val(""), 
            $("#fotoPantai").val(""), 
            $("#deskripsi").val(""), 
            $("#tanggalMulai").val(""), 
            $("#tanggalAkhir").val("");
        });
    });
});

var loadFile = function(event) {
    var output = document.getElementById('output');
    var link = document.getElementById('fotoPantai').value;
    output.src = link;
    output.classList.add("mt-1");
    output.classList.add("rounded-md");
    output.classList.add("p-2");
    output.classList.add("border");
    output.classList.add("border-slate-400");
};