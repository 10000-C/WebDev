import React from 'react'
import Header from '../widget/Header'
import Hero from '../widget/Hero'
import Card from '../components/Card'

function HomePage() {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-white to-blue-300'>
      <div className='container mx-auto p-4'>
        <Header />
      </div>
      <div className='flex justify-center'>
          <Hero />
      </div>
      <div className='grid justify-items-center gap-8 pb-28 relative'>
        <Card
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
        title="Excting Experience"
        description="Get the information of gyms around you."
        mode="large"
        onClick={() => navigate('/your-target-path')}
        />
        <Card
        image="https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png"
        title="Friendly Connections"
        description="Have conversations about sports and find guys who have same interest."
        mode="avatar"
        onClick={() => navigate('/your-target-path')}
        />
      </div>
    </div>
  )
}

export default HomePage