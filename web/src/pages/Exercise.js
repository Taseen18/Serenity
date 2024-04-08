import React from 'react'
import '../css/resourceMore.css';
//import {resourceList} from "../helper/resourceList" //use open and close curly braces to grab file individually from export
//import resourceItem from "../components/resource"
import Navbar from "../components/Navbar";
import Line from "../assets/images/Line.png"
import { useState, useEffect } from 'react';
import nhsLogo from "../assets/images/nhs_attribution.png";
import BenefitsArticle from './articles/BenefitsExerciseArticle';
import SittingArticle from './articles/SittingArticle';
import PhysicalActivitiesArticle from './articles/PhysicalActivitesArticle';
import ArticleCard from './ArticleCard';



function Exercise() {

  const articles = [
    {
      id: 'benefits',
      title: 'Benefits of exercise',
      Component: BenefitsArticle,
      description: 'Uncover the multitude of health benefits regular exercise offers beyond weight loss.',
    },
    {
      id: 'sitting',
      title: 'Sitting Disease',
      Component: SittingArticle,
      description: 'Delve into the risks associated with prolonged sitting and what it means for your long-term health.',
    },
    {
      id: 'activities',
      title: 'Physical activities',
      Component: PhysicalActivitiesArticle,
      description:'Find out how different types of physical activities can cater to varying fitness goals and lifestyles.',
    },
  ];

  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleArticleSelect = (id) => {
    setSelectedArticleId(id);
  };
  
  const SelectedArticleComponent = articles.find(article => article.id === selectedArticleId)?.Component;

  return (
    <div className="Holder">
          {/*Going to make the holder section a component, so doesnt refresh to new page when u use the h3 links to cycle inbetween..
          <div className="menuList">
            {resourceList.map((resourceItem, key) => {
           return <resourceItem key={key} titleCenter={resourceItem.titleCenter} leftScroll={resourceItem.leftScroll} rightScroll={resourceItem.rightScroll} infomation={resourceItem.infomation}/>
        })}
      </div>*/}
      <Navbar />
      <div className="topSection">
        <h3> {"<"}<a href="diet">Diet</a></h3>
        <div className="titleSection">
          <h1 className="title">Exercise</h1>
          <img className="underline" src={Line} />
        </div>
        <h3><a href="mentalhealth">Mental Health </a>{">"}</h3>
      </div>
      <div className='container'>
        {articles.map((article) => (
            <a href="#content"><ArticleCard className='card' key={article.id} article={article} onArticleSelect={handleArticleSelect} /></a>
        ))}
      </div>
      <div id= "content" className='resourceWrapper'>
        {SelectedArticleComponent && <div style={{ marginTop: '20px' }}><SelectedArticleComponent /></div>}
        <div className="logo-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href='https://www.nhs.uk/'><img src={nhsLogo} alt="NHS Logo" className="nhs" style={{ maxWidth: '200px' }} /></a>
        </div>
      </div>

       {/*
      <div className="resourceWrapper">
        <h1>Benefits of exercise</h1>
        <div>
          <p><b>Step right up! It's the miracle cure we've all been waiting for.</b></p><p>It can reduce your risk of major illnesses, such as <a href="/conditions/coronary-heart-disease/">coronary heart disease</a>, <a href="/conditions/stroke/">stroke</a>, <a href="/conditions/type-2-diabetes/">type 2 diabetes</a> and <a href="/conditions/cancer/">cancer</a> and lower your risk of early death by up to 30%.</p><p>It's free, easy to take, has an immediate effect and you don't need a GP to get some. Its name? Exercise.</p><p>Check physical activity guidelines for:</p><ul><li><a href="/live-well/exercise/physical-activity-guidelines-children-under-five-years/">children (under 5 years)</a></li><li><a href="/live-well/exercise/physical-activity-guidelines-children-and-young-people/">children and young people (5 to 18 years)</a></li><li><a href="/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/">exercise (adults 19 to 64 years)</a></li><li><a href="/live-well/exercise/physical-activity-guidelines-older-adults/">older adults (65 years and over)</a></li></ul><p>Exercise is the miracle cure we've always had, but for too long we've neglected to take our recommended dose. Our health is now suffering as a consequence.</p><p>This is no snake oil. Whatever your age, there's strong scientific evidence that being physically active can help you lead a healthier and happier life.</p><p>People who exercise regularly have a lower risk of developing many long-term (chronic) conditions, such as heart disease, type 2 diabetes, stroke, and some cancers.</p><p>Research shows that physical activity can also boost self-esteem, mood, sleep quality and energy, as well as reducing your risk of <a href="/conditions/stress-anxiety-depression/understanding-stress/">stress</a>, <a href="/conditions/clinical-depression/">clinical depression</a>, <a href="/conditions/dementia/about-dementia/what-is-dementia/">dementia</a> and <a href="/conditions/alzheimers-disease/">Alzheimer's disease</a>.</p>
          <p>Given the overwhelming evidence, it seems obvious that we should all be physically active. It's essential if you want to live a healthy and fulfilling life into old age.</p><p>It's medically proven that people who do regular physical activity have lower risk of:</p><ul><li>coronary heart disease and stroke</li><li>type 2 diabetes</li><li><a href="/conditions/bowel-cancer/">bowel cancer</a></li><li><a href="/conditions/breast-cancer/">breast cancer in women</a></li><li>early death</li><li><a href="/conditions/osteoarthritis/">osteoarthritis</a></li><li><a href="/conditions/broken-hip/">hip fracture</a></li><li><a href="/conditions/falls/">falls</a> (among older adults)</li><li>depression</li><li>dementia</li></ul>
          <p>To stay healthy, the <a href="https://www.gov.uk/government/publications/physical-activity-guidelines-uk-chief-medical-officers-report">UK Chief Medical Officers' Physical Activity Guidelines, on GOV.UK</a>, state that adults should try to be active every day and aim to do at least 150 minutes of physical activity over a week, through a variety of activities.</p><p>For most people, the easiest way to get moving is to make activity part of everyday life, like <a href="/live-well/exercise/walking-for-health/">walking for health</a> or cycling instead of using the car to get around. However, the more you do, the better, and taking part in activities such as sports and exercise will make you even healthier.</p><p>For any type of activity to benefit your health, you need to be moving quick enough to raise your heart rate, breathe faster and feel warmer. This level of effort is called moderate intensity activity. If you're working at a moderate intensity you should still be able to talk but you won't be able to sing the words to a song.</p><p>An activity where you have to work even harder is called vigorous intensity activity. There is substantial evidence that vigorous activity can bring health benefits over and above that of moderate activity. You can tell when it's vigorous activity because you're breathing hard and fast, and your heart rate has gone up quite a bit. If you're working at this level, you won't be able to say more than a few words without pausing for a breath.</p>
          <p>People are less active nowadays, partly because technology has made our lives easier. We drive cars or take public transport. Machines wash our clothes. We entertain ourselves in front of a TV or computer screen. Fewer people are doing manual work, and most of us have jobs that involve little physical effort. Work, household chores, shopping and other necessary activities are far less demanding than for previous generations.</p><p>We move around less and burn off less energy than people used to. Research suggests that many adults spend more than 7 hours a day sitting down, at work, on transport or in their leisure time. People aged over 65 spend 10 hours or more each day sitting or lying down, making them the most sedentary age group.</p>
          <p>Inactivity is described by the Department of Health and Social Care as a "silent killer". Evidence is emerging that sedentary behaviour, such as sitting or lying down for long periods, is bad for your health.</p><p>Not only should you try to raise your activity levels, but you should also reduce the amount of time you and your family spend sitting down.</p><p>Common examples of sedentary behaviour include watching TV, using a computer, using the car for short journeys and sitting down to read, talk or listen to music. This type of behaviour is thought to increase your risk of developing many chronic diseases, such as heart disease, stroke and type 2 diabetes, as well as weight gain and <a href="/conditions/obesity/">obesity</a>.</p><p>Crucially, you can hit your weekly activity target but still be at risk of ill health if you spend the rest of the time sitting or lying down.</p><p>For a summary on the health benefits of being more active, check out these <a href="https://www.gov.uk/government/publications/physical-activity-guidelines-infographics">physical activity guidelines from the Department of Health and Social Care</a>.</p>
        </div>

        <h1>Why we should sit less</h1>
        <div>
          <p><b>There is increasing evidence that, unless you are a wheelchair user, sitting down too much can be a risk to your health</b></p><p>To reduce our risk of ill health from inactivity, we are advised to exercise regularly, at least <a href="/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/">150 minutes a week</a>, and reduce sitting time.</p><p>Studies have linked being inactive with being overweight and obese, <a href="/conditions/type-2-diabetes/">type 2 diabetes</a>, some types of <a href="/conditions/cancer/">cancer</a>, and early death.</p><p>Sitting for long periods is thought to slow the metabolism, which affects the body's ability to regulate blood sugar, blood pressure and break down body fat.</p><p>Many adults in the UK spend around 9 hours a day sitting. This includes watching TV, using a computer, reading, doing homework, travelling by car, bus or train but does not include sleeping.</p>
          <p>The <a href="https://www.gov.uk/government/publications/physical-activity-guidelines-uk-chief-medical-officers-report">UK Chief Medical Officers' Physical Activity Guidelines report on GOV.UK</a> recommends breaking up long periods of sitting time with at least light activity.</p><p>However, there is currently not enough evidence to set a time limit on how much time people should sit each day.</p><p>Nevertheless, some countries – such as Australia – have made recommendations that children limit screen time, such as TV and video games, to 1 to 2 hours a day. This is to reduce the time spent sitting.</p>
          <p>The link between illness and sitting first emerged in the 1950s, when researchers found double decker bus drivers were twice as likely to have heart attacks as their bus conductor colleagues. The drivers sat for 90 per cent of their shifts, the conductors climbed about 600 stairs each working day.</p><p>It is thought excessive sitting slows the metabolism – which affects our ability to regulate blood sugar and blood pressure, and metabolise fat – and may cause weaker muscles and bones.</p><p>Research on astronauts in the early 1970s found life in zero gravity was linked with accelerated bone and muscle loss and ageing.</p>
          <p>Most of the evidence is based on observational studies, which have only shown an association between sitting and ill health but not a direct cause.</p>
          <p>In children under 5, the advice is to limit the time they spend watching TV, travelling by car, bus or train, or being strapped into a buggy.</p><p>While this may be a challenge for busy parents, the advice reflects growing awareness that early life experiences and habits impact upon our health as adults.</p><p>Tips to reduce sitting time:</p><ul><li>do not leave a child in a pram or buggy, car seats or highchair for longer than 1 hour at a time</li><li>reduce time spent in walking aids or baby bouncers</li><li>reduce time spent in front of the TV or other screens</li></ul><p><a href="/live-well/exercise/physical-activity-guidelines-children-under-five-years/">Find out about physical activity guidelines for children under 5 years</a></p>
          <p>For children and teenagers aged 5 to 18, reducing sitting time includes anything that involves moving in and around the home, classroom or community.</p><p>Tips to reduce sitting time:</p><ul><li>consider ways for children and teenagers to "earn" screen time</li><li>agree a family limit to screen time per day</li><li>make bedrooms a TV, electronic device, laptop and phone-free zone</li><li>set "no screen time" rules to encourage other activities</li><li>encourage participation in house chores, such as setting the table or taking the bins out</li><li>choose gifts such as a scooter, skateboard, ball or kite to encourage active play</li></ul><p>Parents could lead by example by also reducing their TV time and other sitting-based tasks.</p><p><a href="/live-well/exercise/physical-activity-guidelines-children-and-young-people/">Find out about physical activity guidelines for children and young people</a></p>
          <p>Adults aged 19 to 64 are advised to try to sit down less throughout the day, including at work, when travelling and at home.</p><p>Tips to reduce sitting time:</p><ul><li>stand on the train or bus</li><li>take the stairs and walk up escalators</li><li>set a reminder to get up every 30 minutes</li><li>place a laptop on a box or similar to work standing</li><li>stand or walk around while on the phone</li><li>take a walk break every time you take a coffee or tea break</li><li>walk to a colleague's desk instead of emailing or calling</li><li>swap some TV time for more active tasks or hobbies</li></ul><p><a href="/live-well/exercise/physical-activity-guidelines-for-adults-aged-19-to-64/">Find out about physical activity guidelines for adults aged 19 to 64</a></p>
          <p>Some older people (aged 65 and over) are known to spend 9 hours or more each day sitting.</p><p>Tips to reduce sitting time:</p><ul><li>avoid long periods sat in front of a TV or computer</li><li>stand up and move during TV advert breaks</li><li>stand or walk while on the phone</li><li>use the stairs as much as possible</li><li>take up active hobbies such as gardening and DIY</li><li>join in community-based activities, such as dance classes and walking groups</li><li>take up active play with grandchildren, if you have them</li><li>do most types of housework</li></ul><p><a href="/live-well/exercise/physical-activity-guidelines-older-adults/">Find out about physical activity guidelines for older adults</a></p>
        </div>
        
        <h1>Physical activity guidelines for adults aged 19 to 64</h1>
        <div>
          <p><b>Adults should do some type of physical activity every day. Exercise just once or twice a week can reduce the risk of heart disease or stroke.</b></p>
          <p>Speak to your GP first if you have not exercised for some time, or if you have medical conditions or concerns. Make sure your activity and its intensity are appropriate for your fitness.</p><p>Adults should aim to:</p><ul><li>do strengthening activities that work all the major muscle groups (legs, hips, back, abdomen, chest, shoulders and arms) on at least 2 days a week</li><li>do at least 150 minutes of moderate intensity activity a week or 75 minutes of vigorous intensity activity a week</li><li>spread exercise evenly over 4 to 5 days a week, or every day</li><li>reduce time spent sitting or lying down and break up long periods of not moving with some activity</li></ul><p>You can also achieve your weekly activity target with:</p><ul><li>several short sessions of very vigorous intensity activity</li><li>a mix of moderate, vigorous and very vigorous intensity activity</li></ul><p>These guidelines are also suitable for:</p><ul><li>disabled adults</li><li>pregnant women and new mothers</li></ul><p>When you start exercising after pregnancy, make sure your physical activity choices reflect your activity levels before pregnancy. You should include strength training.</p><p>After your 6- to 8-week postnatal check, you can start to do more intense activities if you feel you're able to. Vigorous activity is not recommended if you were inactive before pregnancy.</p>
          <p>Moderate activity will raise your heart rate, and make you breathe faster and feel warmer. One way to tell if you're working at a moderate intensity level is if you can still talk, but not sing.</p><p>Examples of moderate intensity activities include:</p><ul><li>brisk <a href="/live-well/exercise/walking-for-health/">walking</a></li><li>water aerobics</li><li>riding a bike</li><li>dancing</li><li>doubles tennis</li><li>pushing a lawn mower</li><li>hiking</li><li>rollerblading</li></ul>
          <p>Vigorous intensity activity makes you breathe hard and fast. If you're working at this level, you will not be able to say more than a few words without pausing for breath.</p><p>In general, 75 minutes of vigorous intensity activity a week can give similar health benefits to 150 minutes of moderate intensity activity.</p><p>Most moderate activities can become vigorous if you increase your effort.</p><p>Examples of vigorous activities include:</p><ul><li>running</li><li>swimming</li><li>riding a bike fast or on hills</li><li>walking up the stairs</li><li>sports, like football, rugby, netball and hockey</li><li>skipping</li><li>aerobics</li><li>gymnastics</li><li>martial arts</li></ul><p>For a moderate to vigorous workout, <a href="/live-well/exercise/get-running-with-couch-to-5k/">get running with Couch to 5K</a>, a 9-week running plan for beginners.</p>
          <p>Very vigorous activities are exercises performed in short bursts of maximum effort broken up with rest.</p><p>This type of exercise is also known as High Intensity Interval Training (HIIT).</p><p>Examples of very vigorous activities include:</p><ul><li>lifting heavy weights</li><li>circuit training</li><li>sprinting up hills</li><li>interval running</li><li>running up stairs</li><li>spinning classes</li></ul>
          <p>To get health benefits from strength exercises, you should do them to the point where you need a short rest before repeating the activity.</p><p>There are many ways you can strengthen your muscles, whether you're at home or in a gym.</p><p>Examples of muscle-strengthening activities include:</p><ul><li>carrying heavy shopping bags</li><li>yoga</li><li>pilates</li><li>tai chi</li><li>lifting weights</li><li>working with resistance bands</li><li>doing exercises that use your own body weight, such as push-ups and sit-ups</li><li>heavy gardening, such as digging and shovelling</li><li>wheeling a wheelchair</li><li>lifting and carrying children</li></ul><p>Try exercise routines like:</p><ul><li>strength workout videos in our <a href="/conditions/nhs-fitness-studio/">Fitness Studio exercise videos</a></li></ul><p>You can do activities that strengthen your muscles on the same or different days as your aerobic activity – whatever's best for you.</p><p>Muscle-strengthening exercises are not always an aerobic activity, so you'll need to do them as well as your 150 minutes of aerobic activity.</p>
          <ul><li><a href="/live-well/exercise/physical-activity-guidelines-children-under-five-years/">Physical activity guidelines for children (under 5 years)</a></li><li><a href="/live-well/exercise/physical-activity-guidelines-children-and-young-people/">Physical activity guidelines for children and young people</a></li><li><a href="/live-well/exercise/physical-activity-guidelines-older-adults/">Physical activity guidelines for older adults</a></li></ul><p>GOV.UK also has a number of <a href="https://www.gov.uk/government/publications/physical-activity-guidelines-infographics">physical activity guidelines as infographics</a>.</p>
        </div>
        <div className="logo-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href='https://www.nhs.uk/'><img src={nhsLogo} alt="NHS Logo" className="nhs" style={{ maxWidth: '200px' }} /></a>
        </div>
      </div> */}

    </div>
  )
}

export default Exercise
