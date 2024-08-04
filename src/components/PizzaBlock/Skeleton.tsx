import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={1.5}
    width={280}
    height={466}
    viewBox='0 0 280 466'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='135' cy='135' r='125' />
    <rect x='0' y='275' rx='10' ry='10' width='280' height='23' />
    <rect x='0' y='314' rx='10' ry='10' width='280' height='88' />
    <rect x='0' y='425' rx='10' ry='10' width='95' height='30' />
    <rect x='130' y='414' rx='25' ry='25' width='150' height='45' />
  </ContentLoader>
)

export default Skeleton
