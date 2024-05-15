'use client';
import CountUp from 'react-countup';

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <div className='w-full'>
        <CountUp 
        decimal='.'
        suffix=' RON'
        decimals={2}
        duration={2}
        end={amount} />
    </div>
  )
}

export default AnimatedCounter