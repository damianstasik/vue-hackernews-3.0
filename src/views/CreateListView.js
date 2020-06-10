import { h, onMounted } from 'vue'
import { useStore } from 'vuex'
import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export default function createListView (type) {
  // @vue/component
  return {
    name: `${type}-stories-view`,

    setup() {
      const { dispatch } = useStore();

      onMounted(() => {
        dispatch('FETCH_LIST_DATA', { type })
      })
    },

    title: camelize(type),

    render () {
      return h(ItemList, { type })
    }
  }
}
