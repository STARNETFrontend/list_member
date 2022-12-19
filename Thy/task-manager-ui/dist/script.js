(function() {
  /*
Inspired by dribble.com/shots/1507858-Dashboard
*/
}).call(this);


// Lọc theo ngày
$( "#kiemtra" ).click(function() {
  var ngay = $('#ngay option:selected').val();
  taidulieu(ngay);
});
// Hết lọc theo ngày

// Tải dữ liệu
function taidulieu(ngay) {
  $("#bangngd tbody").empty();
  $.get("http://192.168.10.3:8000/lay-danh-sach-dang-nhap/" +ngay, function (data, status) {
      console.log(data);
       $("#tongthanhvien").html(data.TongThanhVien);
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