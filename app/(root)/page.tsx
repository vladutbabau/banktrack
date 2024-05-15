import HeaderBox from '@/components/HeaderBox'
import { RightSidebar } from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
    const loggedIn = {
        firstName : 'Babau',
        lastName : 'Vlad',
        email : 'vladut_babau@yahoo.com'
    };
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox 
                    type = 'greeting'
                    title = 'Bine ai venit,'
                    user = {loggedIn?.lastName || 'Guest'}
                    subtext = 'Access and manage your account and transactions efficently'
                />

                <TotalBalanceBox 
                    accounts = {[]}
                    totalBanks = {1}
                    totalCurrentBalance = {1250.35}
                />
            </header>

            RECENT TRANSACTION
        </div>

        <RightSidebar 
            user = {loggedIn}
            transactions={[]}
            banks={[{currentBalance: 1250.35}, {currentBalance: 123.50}]}
        />
    </section>
  )
}

export default Home