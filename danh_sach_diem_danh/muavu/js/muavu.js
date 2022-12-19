/*Dang Tuan Thanh ft Nong Van Tuan Anh */
jQuery(window).load(function() {
    jQuery("#status").fadeOut();
    jQuery("#preloader").delay(200).fadeOut("slow");
    })
var dkNutthem = true;

$( "#kiemtra" ).click(function() {
    
    
     var ngay = $('#editst option:selected').val();
     taidulieu(ngay);
  });
$(document).ready(function () {

    $("#themnguoidung").click(function () {

        showpop();
        dkNutthem = true;
    });
    // taidulieu(ngay);
    // phàn ngày giờ
    // Tao 2 mang chua ten ngay thang
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // Tao moi doi tuong Date()
    var newDate = new Date();
    // Lay gia tri thoi gian hien tai
    newDate.setDate(newDate.getDate());
    // Xuat ngay thang, nam
    $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

    setInterval(function () {
        // lay gia tri giay trong doi tuong Date()
        var seconds = new Date().getSeconds();
        // Chen so 0 vao dang truoc gia tri giay
        $("#sec").html((seconds < 10 ? "0" : "") + seconds);
    }, 1000);

    setInterval(function () {
        // Tuong tu lay gia tri phut
        var minutes = new Date().getMinutes();
        // Chen so 0 vao dang truoc gia tri phut neu gia tri hien tai nho hon 10
        $("#min").html((minutes < 10 ? "0" : "") + minutes);
    }, 1000);

    setInterval(function () {
        // Lay gia tri gio hien tai
        var hours = new Date().getHours();
        // Chen so 0 vao truoc gia tri gio neu gia tri nho hon 10
        $("#hours").html((hours < 10 ? "0" : "") + hours);
    }, 1000);
});


function taidulieu(ngay) {
    $("#bangngd tbody").empty();
    $.get("http://192.168.10.3:8000/lay-danh-sach-dang-nhap/" +ngay, function (data, status) {
        console.log(data);
    
        $("#slcm").html("<h5>Số Lượng Có Mặt: </h5>"+data.SoLuongCoMat);
        $("#slt").html("<h5>Số Lượng Trễ: </h5>"+data.SoLuongTre);
        console.log(data.DanhSachCoMat[0].HoTen);
        for (var index = 0; index < data.DanhSachCoMat.length; index++) {
            var tr = '<tr>' +
                '<td>' + data.DanhSachCoMat[index].HoTen + '</td>' +
                '<td>' + data.DanhSachCoMat[index].MSSV + '</td>' +
                '<td>' + data.DanhSachCoMat[index].Ngay + '</td>' +
                
                '<td>' + data.DanhSachCoMat[index].Gio + '</td>' +
                '<td>' + (data.DanhSachCoMat[index].DiTre == true ? 'Đi trễ' : 'Có mặt') + '</td>' +
                // '<td>' + data[index].st + '</td>' +
                // '<td>' + "<a onclick='edit(" + data[index].id + ")' class='btnEdit'> <i data='" + data[index].id + "' class='fas fa-user-edit'></i>....</a>" + " <a onclick='xoa(" + data[index].id + ")'> <i  class='fas fa-user-slash'></i></a>" + " <a onclick='baocao(" + data[index].id + ")'>.... Báo Cáo</a>" + '<td>'

            '</tr>'
            $("#bangngd tbody").append(tr);
        }
    })
    
}


function edit(id) {
    dkNutthem = false;
    $.get("https://60ab8b865a4de40017cca529.mockapi.io/giaodich/" + id, function (data, status) {
        $("#editName").val(data.name);
        $("#editAddress").val(data.type);
        $("#editgia").val(data.donvi);
        $("#editdayst").val(data.dayst);
        $("#editdayen").val(data.dayen);
        $("#editst").val(data.st);
        $("#editId").val(data.id);
        /* II mục 2  ẩn ô sản lượng*/
        $("#an").css("display", "none");
        $("#an2").css("display", "none");
        //
        $("#pop").show(300);
    })
}

$(".daux").click(function (event) {
    /*II mục 2  hiển thị lại ô sản lượng */
    $("#an").css("display", "block");
    $("#an2").css("display", "block");
    //
    $("#editAddress").css("border", "1px solid gray");
    $("#editName").val("")
    $("#editAddress").val("")
    $("#editgia").val("")
    $("#editdayst").val("")
    $("#editdayen").val("")
    $("#editst").val("Trong mùa vụ")

    $(".form-group").css("display", "block");
    $("#xacnhan").css("display", "block");
    $(".form-group2").css("display", "none");
    $("#send").css("display", "none");

    $("#pop").hide(300);
    $("#pop2").hide(300);
    $("#poptrangthai").hide(300);
    $("#popthongke").hide(300);
    taidulieu();
})

function dongpop() {



    $("#pop").hide(300);

    $("#editName").val("")
    $("#editAddress").val("")

    $("#editdayst").val("")
    $("#editdayen").val("")
    /* II muc 1 mặc định trạng thái là trong mùa vụ */
    $("#editst").val("Trong mùa vụ")

}

function showpop() {
    $("#pop").show(300);
}


$("#xacnhan").click(function () {
    /* II mục 1 bắt lỗi sản lượng không nhập */
    var sssl = $("#editAddress").val();
    if (sssl == "") {
        $("#editAddress").css("border", "2px solid red");
        // 
    } else {
        var dulieu = {
            "name": $("#editName").val(),
            "type": $("#editAddress").val(),
            "donvi": $("#editgia").val(),
            "dayst": $("#editdayst").val(),
            "dayen": $("#editdayen").val(),
            "st": $("#editst").val()
        };
        /* 
        var bctt = $("#editst").val();
        console.log(bctt);
        var bctrue = true;
        if (bctt =="Đã kết thúc"){
            bctrue == true;
        }else{
            bctrue == false;
        }*/
        if (dkNutthem) {
            $.ajax(
                { url: "https://60ab8b865a4de40017cca529.mockapi.io/giaodich", method: "POST", data: dulieu }
            ).done(function () {
                dongpop();
                taidulieu();
                thongkedulieu();
            })
        } else {
            $.ajax(
                {
                    url: "https://60ab8b865a4de40017cca529.mockapi.io/giaodich/" + $("#editId").val(),
                    method: "PUT",
                    data: dulieu
                }
            ).done(function (msg) {
                console.log(msg);

                dongpop();
                taidulieu();
                thongkedulieu();
            });
        }
        $("#editAddress").css("border", "1px solid gray");
        /* II mục 2  hiển thị lại ô sản lượng khi ng dùng bấm nút xác nhận */
        $("#an").css("display", "block");
        $("#an2").css("display", "block");
        //
    }
})


function xoa(id) {
    $.ajax({
        url: "https://60ab8b865a4de40017cca529.mockapi.io/giaodich/" + id,
        method: "DELETE"
    }).done(function () {
        taidulieu();
    })
}

// II mục 4
function baocao(id) {
    var luu;
    $.get("https://60ab8b865a4de40017cca529.mockapi.io/giaodich/" + id, function (data, status) {

        var luu;
        luu = String([data.st]);

        console.log(luu);

        var xn;
        xn = String("Đã kết thúc");
        console.log(xn);
        if (luu == xn) {
            /* II mục 4 tắt form chính để bật sản lượng đạt được */
            $(".form-group").css("display", "none");
            $("#xacnhan").css("display", "none");
            $(".form-group2").css("display", "block");
            $("#send").css("display", "block");
            //
            showpop();
            $("#send").click(function () {
                //đóng pop và set mặc định
                $("#pop").hide(300);
                $("#editsl").val("");
                $("#editdv2").val("Kg");

                /* bật lại form chính  */
                $(".form-group").css("display", "block");
                $("#xacnhan").css("display", "block");
                $(".form-group2").css("display", "none");
                $("#send").css("display", "none");
                alert('Báo cáo đã được gửi đi');
            });
        } else {
            alert("Mùa vụ chưa kết thúc");
            $("#editName").val("");
        }
    })
    /* 
    if (bctrue == true){
        alert('da ket thuc');
    }else{
        alert('chua ket thuc');
    }*/
}


/* chức năng khác */


/** danh sách mùa vụ  */
$("#thongke").click(function () {
    $("#popthongke").show(300);
    thongkedulieu();
});

function thongkedulieu() {
    $("#thongkedulieu tbody").empty();
    $.get("https://60ab8b865a4de40017cca529.mockapi.io/giaodich", function (data, status) {
        console.log(data);
        for (var index = 0; index < data.length; index++) {
            var tr = '<tr>' +
                '<td>' + data[index].id + '</td>' +
                '<td>' + data[index].name + '</td>' +
                '<td>' + data[index].type + '</td>' 
                

            '</tr>'
            $("#thongkedulieu tbody").append(tr);
        }
    })
}

function xoathongke(id) {
    $.ajax({
        url: "https://60ab8b865a4de40017cca529.mockapi.io/giaodich/" + id,
        method: "DELETE"
    }).done(function () {
        thongkedulieu();
    })
}


// NÚt đăng xuất
$("#out").click(function () {
    sessionStorage.removeItem("luutk");
    sessionStorage.removeItem("luumk");
    window.location.href = '../index.html';
    return false;

});
$("#out").html("Đăng Xuất: "+sessionStorage.getItem("luutk"));

//nut bao loi
$("#ctloi").click(function () {
    $("#pop2").show(300);

});


$("#timkiem").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
/*Dang Tuan Thanh ft Nong Van Tuan Anh */
/*Dang Tuan Thanh ft Nong Van Tuan Anh */