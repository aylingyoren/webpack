export default class Post {
   constructor(title, img) {
      this.title = title;
      this.img = img;
      this.date = new Date();
   }

   toString() {
      return JSON.stringify({
         date: this.date.toJSON(),
         img: this.img,
         title: this.title
      }, null, 4);
   }
}