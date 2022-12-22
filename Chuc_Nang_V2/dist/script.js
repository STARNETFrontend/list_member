(function () {
  /*
Inspired by dribble.com/shots/1507858-Dashboard
*/
}).call(this);

var isThem = true;


// Tải dữ liệu
function taidulieu(ngay) {
  $("#bangngd tbody").empty();
  $.get("http://api.clbmang.net:8000/lay-danh-sach-thanh-vien" + ngay, function (data, status) {
    console.log(data);
    $.get("http://api.clbmang.net:8000/lay-so-luong-thanh-vien" + ngay, function (data, status) {
      console.log(data);
      $("#tongthanhvien").html(data.SoLuongThanhVien);
    })

    // $("#slcm").html("<h5>Số Lượng Có Mặt: </h5>"+data.SoLuongCoMat);
    // $("#slt").html("<h5>Số Lượng Trễ: </h5>"+data.SoLuongTre);
    console.log(data.DanhSachCoMat[0].HoTen);
    for (var index = 0; index < data.DanhSachCoMat.length; index++) {
      var tr = '<tr>' +
        '<td>' + data.DanhSachCoMat[index].Hinh + '</td>' +
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
//Hết tải dữ liệu

//Tìm kiếm
$("#search-text").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#myTable tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});
//Hết Tìm kiếm

// Lọc theo ngày
$("#kiemtra").click(function () {
  var ngay = $('#ngay option:selected').val();
  taidulieu(ngay);
});
// Hết lọc theo ngày

// Popup thêm
//hiển thị form
$("#them").click(function () {
  isThem = true;
  $(".modal").css("display", "block");
});

//đóng form 
$("#btnCancel").click(function () {
  dongform();
});


//Lưu dữ liệu thêm( btnAdd)
$("#btnAdd").click(function () {

  var dulieu = {
    "name": $("#txtname").val(),
    "mssv": $("#txtnumber").val(),
    "ngay": $("#txtdate").val(),
    "lydo": $("#txtlydo").val()
  };
  if (isThem) {
    console.log("Đây là hành động thêm");
    $.ajax(
      {
        url: "api them thanh viên", method: "POST", data: JSON.stringify(dulieu), contentType: "application/json; charset=utf-8",
        success: function (data) {
          console.log("thanh cong");
          console.log(data);
          dongform();
          // var json = "<h4>Ajax Response</h4><pre>"
          //     + JSON.stringify(data, null, 4) + "</pre>";
          // $('#feedback').html(json);

          // console.log("SUCCESS : ", data);
          // $("#btn-search").prop("disabled", false);

        },
        error: function (err) {
          console.log("loi");
          console.log(err);
          //
          document.getElementById("err").innerHTML = err.responseText;
          $("#err").css("display", "block");
          console.log(err.responseText);
          alert("Lỗi khi thêm thành viên", err.responseText);
          // var json = "<h4>Ajax Response</h4><pre>"
          //     + e.responseText + "</pre>";
          // $('#feedback').html(json);

          // console.log("ERROR : ", e);
          // $("#btn-search").prop("disabled", false);

        }
      })

  } else {
    console.log("Đây là hành động sửa");
    $.ajax(
      {
          url: "API sua" + $("#editId").val(),
          method: "PUT",
          data: dulieu,
          success: function (data) {
            console.log("thanh cong");
            console.log(data);
            dongform();
            // var json = "<h4>Ajax Response</h4><pre>"
            //     + JSON.stringify(data, null, 4) + "</pre>";
            // $('#feedback').html(json);
  
            // console.log("SUCCESS : ", data);
            // $("#btn-search").prop("disabled", false);
  
          },
          error: function (err) {
            console.log("loi");
            console.log(err);
            //
            document.getElementById("err").innerHTML = err.responseText;
            $("#err").css("display", "block");
            console.log(err.responseText);
            alert("Lỗi khi thêm thành viên", err.responseText);
            // var json = "<h4>Ajax Response</h4><pre>"
            //     + e.responseText + "</pre>";
            // $('#feedback').html(json);
  
            // console.log("ERROR : ", e);
            // $("#btn-search").prop("disabled", false);
  
          }
      }
  )
  }

});

//đóng form
function dongform() {
  //reset dữ liệu trong form
  $("#txtname").val("")
  $("#txtnumber").val("")
  $("#txtdate").val("")
  $("#txtlydo").val("")

  // đóng form
  $(".modal").css("display", "none");
  document.getElementById("tieudefrm").innerHTML = '<h3 id="tieudefrm" style="padding: 10px; ">THÊM THÀNH VIÊN</h3>';
}
// Hết popup thêm

//Nút sửa
$("#btnSua").click(function () {
  isThem = false;
  document.getElementById("tieudefrm").innerHTML = '<h3 id="tieudefrm" style="padding: 10px; ">SỬA THÀNH VIÊN</h3>';

  $(".modal").css("display", "block");
  //lấy API đổ lên form
  $.get("Api danh sách" + id, function (data, status) {
    $("#txtname").val(data.name);
    $("#txtnumber").val(data.type);
    $("#txtdate").val(data.donvi);
    $("#txtlydo").val(data.dayst);
    $("#editId").val(data.id);
  })
});
//Hết nút sửa