import { NextPage } from 'next'
import Banner from '../components/home/Banner'
import HotelList from '../components/home/HotelList'
import Page from '../components/reusables/Page'

const Home: NextPage = () => {
  return (
    <Page title='Hotel Ranking'>
      <Banner />
      <HotelList />
    </Page>
  )
}

export default Home;
