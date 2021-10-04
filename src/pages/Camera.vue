<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame flex q-pa-xs">
      <!-- <img
        class="full-width"
        src="https://cdn.quasar.dev/img/parallax2.jpg" alt="" /> -->
      <video
      v-show="!imageCaptured"
      ref="video"
      class="full-width"
      autoplay />

      <canvas
      v-show="imageCaptured"
      ref="canvas" class="full-width" />
    </div>

    <div class="text-center content-center justify-center q-pa-sm">

      <!-- 촬영버튼 -->
      <q-btn
        v-if="hasCameraSupport"
        @click="captureImage"
        round
        icon="photo_camera"
        color="grey-10"
        size="lg" />

      <!-- 이미지 파일 -->
      <q-file
        v-else
        v-model="imageUpload"
        label="Choose an image"
        outlined
        accept="image/*"
        @input="captureImageFallback"
      >
        <template v-slot:prepend >
          <q-icon name="attach_file" />
        </template>
      </q-file>
    </div>

    <!-- Caption -->
    <div class="row justify-center q-pa-md">
      <q-input
      class="col col-sm-7"
      v-model="post.caption"
      label="Caption"
      dense />
    </div>

    <!-- Location -->
    <div class="row justify-center q-pa-md">
      <q-input
      v-model="post.location"
      :loading="locationLoading"
      class="col col-sm-7"
      label="Location"
      dense>


        <template v-slot:append>
          <q-btn
          v-show="!locationLoading && locationSupported"
          @click="getLocation"
          dense round flat icon="near_me" />
        </template>
      </q-input>
    </div>

    <div class="row justify-center q-mt-lg">
      <q-btn
      @click="addPost()"
      rounded
      type="button"
      color="primary"
      label="Post Image" />
    </div>

  </q-page>
</template>
<script>
import { uid } from 'quasar';
require('md-gum-polyfill');

export default {
  name: 'Camera',
  components: {},
  data() {
  return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true,
      locationLoading: false
    };
  },
  computed: {
    locationSupported() {
      if('geolocation' in navigator) return
        true
        return false
    }
  },
  mounted() {
    this.initCamera();
    console.log('navigator: ', navigator);
  },
  beforeUnmount() {
    if (this.hasCameraSupport) {
      this.disableCamera()
    }
  },
  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch((error) => {
        this.hasCameraSupport = false
      })
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      this.post.photo = this.dataURItoBlob(canvas.toDataURL());
      this.disableCamera()
    },
    captureImageFallback(file) {
      this.post.photo = file
      // this.imageUpload = file
      // console.log(this.imageUpload);

      let canvas = this.$refs.canvas;
      let ctx = canvas.getContext("2d");

      var reader = new FileReader();
      reader.onload = e => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          this.imageCaptured = true
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file.target.files[0]);
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop();
      })
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], {type: mimeString});
      return blob;
    },

    // 나의 위치 검색
    getLocation() {
      this.locationLoading = true;

      navigator.geolocation.getCurrentPosition(p => {
        console.log("position : ", p);
        this.getCityAndContry(p)
      }, err => {
        this.locationError()
        console.log("error : ", err)
      }, {timeout: 7000 })
    },

    // geo api로 위치 구하기
    getCityAndContry(p) {
      let apiUrl = `https://geocode.xyz/${ p.coords.latitude },${ p.coords.longitude }?json=1`;

      this.$axios.get(apiUrl).then(result => {
        console.log(result)
        this.locationSuccess(result)
      }).catch(err => {
        console.log(err);
      })
    },
    // 위치 입력
    locationSuccess(result) {
      this.post.location = result.data.city
      if (result.data.country) {
        this.post.location += `, ${result.data.country}`
      }
      this.locationLoading = false
    },
    locationError() {
      this.$q.dialog({
        title: 'Error',
        message: '위치 정보를 찾지 못했습니다.'
      })
      this.locationLoading = false
    },

    addPost() {
      let formData = new FormData()
      formData.append('id', this.post.id)
      formData.append('caption', this.post.caption)
      formData.append('location', this.post.location)
      formData.append('date', this.post.date)
      // formData.append('imageUrl', this.post.photo[0], this.post.id + '.png')
      // console.log(this.post.photo);
      // console.log(this.post.photo.path[0].files[0]);

      // this.$axios.post(`${ process.env.API }/createPost`, formData).then(response => {
      //   console.log(response)
      //   // console.log(formData)
      // }).catch(error => {
      //   console.log(error)
      // })
    }
  }
}
</script>
<style scoped lang="scss">
.camera-frame {
  border:  2px solid $grey-10;
  border-radius: 10px;
}
</style>
