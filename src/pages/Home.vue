<template>
  <q-page class="constrain q-pa-md">

    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
          <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat bordered>

            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>K_meijjing</q-item-label>
                <q-item-label caption>
                  Seoul, Korea
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-img :src="post.imageUrl"></q-img>

            <q-card-section>
              <div class="text-h6">
                {{ post.caption }}
              </div>
              <div class="text-caption text-grey-7">
                {{ niceDate(post.date) }}
              </div>
            </q-card-section>
          </q-card>
        </template>


        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="text-center text-grey">포스트가 없습니다.</h5>
        </template>

        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
            </q-card-section>
          </q-card>
        </template>
      </div>




      <div class="col-4 large-screen-only">
        <!-- <q-item class="fixe row bg-white">
          <q-item-section avatar>
            <q-avatar
            size="48px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>K_meijjing</q-item-label>
            <q-item-label caption>
              Seoul, Korea
            </q-item-label>
          </q-item-section>
        </q-item> -->


        <q-card class="my-card text-black">
          <q-item class="fixe row bg-white">
            <q-item-section avatar>
              <q-avatar
              size="48px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>K_meijjing</q-item-label>
              <q-item-label caption>
                Seoul, Korea
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-card-actions class="profile_tabs mobile-screen">
            <q-btn flat class="margin-zero">
              <div class="col-12">{{ postNo }}</div>
              <div>게시글</div>
            </q-btn>
            <q-btn flat class="margin-zero">
              <div class="col-12">{{ followerNo }}</div>
              <div>팔로워</div>
            </q-btn>
            <q-btn flat class="margin-zero">
              <div class="col-12">{{ followNo }}</div>
              <div>팔로우</div>
            </q-btn>
          </q-card-actions>


          
        </q-card>




      </div>
    </div>



  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { date } from 'quasar'

export default defineComponent({
  name: 'Home',
  setup() {
    const postNo = ref(0)
    const followerNo = ref(1)
    const followNo = ref(2)

    return {
      postNo,
      followerNo,
      followNo,
    }
  },
  data() {
    return {
      posts: [],
      loadingPosts: false,
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    niceDate(value) {
      return date.formatDate(value, "MMMM D h:mmA");
    },
    getPosts() {
      this.loadingPosts = true
      this.$axios.get(`${ process.env.API }/posts`).then(response => {
        console.log(response);
        this.posts = response.data
        this.loadingPosts = false
        this.postNo = this.posts.length
      }).catch((err) => {
        console.log(err);
        this.$q.dialog({
          title: 'Error',
          message: 'Could not download posts.'
        })
        this.loadingPosts = false
      })
    }
  }
})
</script>
<style scoped lang="scss">
.card-post {
  .q-img {
    min-height: 200px
  }
}

.profile_tabs {
  display: flex;
  justify-content: space-between;
}
</style>
