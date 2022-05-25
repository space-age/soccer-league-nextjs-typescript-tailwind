const API_KEY = process.env.NEXT_PUBLIC_API_KEY_GOOGLE_MAPS
const BASE_URL = 'https://maps.googleapis.com/maps/api/js?key='

const COMMAND = '&callback=initMap'
const requests = {
  fetchMap: `${BASE_URL}${API_KEY}`,
}

export default requests

// 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap'
