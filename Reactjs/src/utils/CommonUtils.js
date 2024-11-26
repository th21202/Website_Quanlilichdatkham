class CommonUtils {
  //cove file sang base64
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      //tạo FileReader object 
      const reader = new FileReader();
      //readAsDataURL được gọi để đọc nội dung của file dưới dạng URL data.
      reader.readAsDataURL(file);
      //sự kiện onload được kích hoạt khi đọc file thành công 
      reader.onload = () => resolve(reader.result);
      //sự kiện onerror được kích hoạt khi đọc file thất bại
      reader.onerror = (error) => reject(error);
    });
  }
}

export default CommonUtils;
