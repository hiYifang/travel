const app = new Vue({
  el: '#app',
  data: {
    data: [],
    // 目前所在的頁數
    currentPage: 0,
    // 所有地區
    locations: [],
    // 目前所選的地區
    currentLocation: ''
  },
  methods: {
    getZoneList() {
      const vm = this;
      // 陣列內容不得重複
      const locations = new Set(); // 當內容重複，則無法加入類陣列內
      vm.data.forEach((item) => {
        locations.add(item.Zone);
      })
      vm.locations = Array.from(locations);
    }
  },
  computed: {
    filterData() {
      const vm = this;
      // (step 1) 先過濾資料
      let zoneArray = [];
      if (vm.currentLocation !== '') {
        zoneArray = vm.data.filter((item) => {
          return item.Zone === vm.currentLocation;
        })
      } else {
        zoneArray = vm.data;
      }

      // (step 2) 呈現每頁的資料內容 newData = [[1...(currentPage: 0)], [2...(currentPage: 1)], [3...(currentPage: 2)]]
      const newData = [];
      zoneArray.forEach((item, index) => {
        // 有幾頁
        if (index % 10 === 0) {
          newData.push([]);
        }
        const page = parseInt(index / 10);
        newData[page].push(item);
      })
      return newData;
    }
  },
  created() {
    const vm = this;
    axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json')
      .then(function (response) {
        vm.data = response.data.result.records;
        vm.getZoneList();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  },
})