import type { NextPage } from 'next'
import { Container } from 'react-bootstrap'
import { Sheet } from '../components/Sheet'
import { TopMenu } from '../components/TopMenu'

const Home: NextPage = () => {
  return (
    <>
      <TopMenu />
      <Sheet />
      <style jsx>{`

      `}</style>
    </>
  )
}

export default Home
