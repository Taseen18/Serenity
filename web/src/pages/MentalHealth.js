import React from 'react'
import '../css/resourceMore.css';
//import {resourceList} from "../helper/resourceList" //use open and close curly braces to grab file individually from export
//import resourceItem from "../components/resource"
import Navbar from "../components/Navbar";
import Line from "../assets/images/Line.png"
import { useState, useEffect } from 'react';
import nhsLogo from "../assets/images/nhs_attribution.png";
import StressArticle from './articles/StressArticle';
import AnxietyArticle from './articles/AnxietyArticle';
import DepressionArticle from './articles/DepressionArticle';

import ArticleCard from './ArticleCard';

function MentalHealth() {

  const articles = [
    {
      id: 'stress',
      title: 'Stress',
      description: 'Understanding and managing stress.',
      Component: StressArticle,
    },
    {
      id: 'anxiety',
      title: 'Anxiety',
      description: 'Identifying and coping with anxiety disorders.',
      Component: AnxietyArticle,
    },
    {
      id: 'depression',
      title: 'Depression',
      description: 'Approaches to dealing with depression.',
      Component: DepressionArticle,
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
        <h3><a href="exercise">Exercise</a> {"<"}</h3>
        <div className="titleSection">
          <h1 className="title"><a href="mentalhealth">Mental Health</a></h1>
          <img className="underline" src={Line} />
        </div>
        <h3><a href="diet">Diet</a>{">"}</h3>
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
      {/* <div className="resourceWrapper">
        <h1>Stress</h1>
        <div>
          <p><b>Most people feel stressed sometimes and some people find stress helpful or even motivating. But if stress is affecting your life, there are things you can try that may help.</b></p><p>Support is also available if you're finding it hard to cope with stress.</p>
          <p>Stress can cause many different symptoms. It might affect how you feel physically, mentally and also how you behave.</p><p>It's not always easy to recognise when stress is the reason you're feeling or acting differently.</p>
          <h3>Referring yourself for therapy</h3><p>If you need more support, you can get free talking therapies like <a href="/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt/overview/">cognitive behavioural therapy (CBT)</a> on the NHS.</p><p>You can refer yourself directly to an NHS talking therapies service without a referral from a GP.</p>
          <h3>See a GP if:</h3><div class="block-richtext"> <ul><li>you're struggling to cope with stress</li><li>things you're trying yourself are not helping</li><li>you would prefer to get a referral from a GP</li></ul> </div>
          <h3>Call 111 or ask for an urgent GP appointment if:</h3><div class="block-richtext"> <ul><li>you need help urgently, but it's not an emergency</li></ul><p>111 can tell you the right place to get help if you need to see someone. Go to <a href="https://111.nhs.uk">111.nhs.uk</a> or <a href="Tel: 111">call: 111</a>.</p> </div>
          <h3>Call 999 or go to A&amp;E now if:</h3><div class="block-richtext"> <ul><li>you or someone you know needs immediate help</li><li>you have seriously harmed yourself – for example, by taking a drug overdose</li></ul><p>A mental health emergency should be taken as seriously as a medical emergency.</p><p><a href="https://www.nhs.uk/Service-Search/Accident-and-emergency-services/LocationSearch/428">Find your nearest A&amp;E</a></p> </div>
          <p>Stress is usually a reaction to mental or emotional pressure. It's often related to feeling like you're losing control over something, but sometimes there's no obvious cause.</p><p>When you're feeling anxious or scared, your body releases stress hormones such as adrenaline and cortisol.</p><p>This can be helpful for some people and stress might help you get things done or feel more motivated.</p><p>But it might also cause physical symptoms such as a faster heartbeat or sweating. If you're stressed all the time it can become a problem.</p><h3>Identifying the cause</h3><p>If you know what's causing your stress it might be easier to find ways to manage it.</p><p>Some examples of things that may cause stress include:</p><ul><li>work – feeling pressure at work, unemployment or retirement</li><li>family – relationship difficulties, divorce or <a href="/conditions/social-care-and-support-guide/support-and-benefits-for-carers/">caring for someone</a></li><li>financial problems – unexpected bills or borrowing money</li><li>health – illness, injury or <a href="/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/grief-bereavement-loss/">losing someone (bereavement)</a></li></ul><p>Even significant life events such as buying a house, having a baby or planning a wedding could lead to feelings of stress.</p><p>You might find it hard to explain to people why you feel this way, but talking to someone could help you find a solution.</p><p><a href="/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/">Find out about the 5 steps to mental wellbeing</a></p>
        </div>
        
        <h1>Signs of an anxiety disorder</h1>
        <div>
          <p><b>Most people feel low sometimes, but if it's affecting your life, there are things you can try that may help.</b></p><p>Support is also available if you're finding it hard to cope with low mood, sadness or depression.</p>
          <p>Symptoms of a general low mood may include feeling:</p><ul><li>sad</li><li>anxious or panicky</li><li><a href="/live-well/sleep-and-tiredness/">more tired than usual</a> or being unable to sleep</li><li>angry or frustrated</li><li>low on confidence or self-esteem</li></ul><p>A low mood often gets better after a few days or weeks.</p><p>It's usually possible to improve a low mood by making small changes in your life. For example, resolving something that's bothering you or getting more sleep.</p><h3>Symptoms of depression</h3><p>If you have a low mood that lasts 2 weeks or more, it could be a sign of <a href="/mental-health/conditions/depression-in-adults/overview/">depression</a>.</p><p>Other symptoms of depression may include:</p><ul><li>not getting any enjoyment out of life</li><li>feeling hopeless</li><li>not being able to concentrate on everyday things</li><li>having <a href="/mental-health/feelings-symptoms-behaviours/behaviours/help-for-suicidal-thoughts/">suicidal thoughts</a> or thoughts about <a href="/mental-health/feelings-symptoms-behaviours/behaviours/self-harm/getting-help/">harming yourself</a></li></ul>
          <div><h3>Do</h3><ul><li><p>try talking about your feelings to a friend, family member, health professional or counsellor. You could also contact <a href="https://www.samaritans.org/how-we-can-help/contact-samaritan/">Samaritans</a>, call <a href="Tel: 116 123">116 123</a> or email <a href="mailto:jo@samaritans.org">jo@samaritans.org</a> if you need someone to talk to</p></li><li><p>try the <a href="/mental-health/self-help/tips-and-support/how-to-be-happier/">6 ways to feel happier</a>, which are simple lifestyle changes to help you feel more in control and able to cope</p></li><li><p>find out <a href="/mental-health/self-help/tips-and-support/raise-low-self-esteem/">how to raise your self-esteem</a></p></li><li><p>consider peer support, where people use their experiences to help each other. <a href="https://www.mind.org.uk/information-support/drugs-and-treatments/peer-support/finding-peer-support/">Find out more about peer support on the Mind website</a></p></li><li><p>try <a href="/mental-health/self-help/tips-and-support/mindfulness/">mindfulness</a>, where you focus on the present moment</p></li><li><p>listen to <a href="/mental-health/self-help/guides-tools-and-activities/mental-wellbeing-audio-guides/">free mental wellbeing audio guides</a></p></li></ul></div>
          <p>If you need more support, you can get free talking therapies like <a href="/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt/overview/">cognitive behavioural therapy (CBT)</a> on the NHS.</p><p>You can refer yourself directly to an NHS talking therapies service without a referral from a GP.</p>
          <h3>See a GP if:</h3><div class="block-richtext"> <ul><li>you've had a low mood for more than 2 weeks</li><li>you're struggling to cope with a low mood</li><li>things you're trying yourself are not helping</li><li>you would prefer to get a referral from a GP</li></ul> </div>
          <h3>Ask for an urgent GP appointment or call 111 if:</h3><div class="block-richtext"> <ul><li>you need help urgently, but it's not an emergency</li></ul><p>111 can tell you the right place to get help if you need to see someone. Go to <a href="https://111.nhs.uk/">NHS 111 online</a> or call 111.</p> </div>
          <h3>Call 999 or go to A&amp;E now if:</h3><div class="block-richtext"> <ul><li>you or someone you know needs immediate help</li><li>you have seriously harmed yourself – for example, by taking a drug overdose</li></ul><p>A mental health emergency should be taken as seriously as a medical emergency.</p><p><a href="/Service-Search/Accident-and-emergency-services/LocationSearch/428">Find your nearest A&amp;E</a></p> </div>
          <p>There are many reasons why you might feel low at some point in your life.</p><p>Any sort of difficult event or experience could lead to sadness or low self-esteem. Sometimes it's possible to feel low without there being an obvious reason.</p><h3>Identifying the cause</h3><p>If you know what's causing your low mood it might be easier to find ways to manage it.</p><p>Some examples of things that may cause a low mood include:</p><ul><li>work – feeling pressure at work, unemployment or retirement</li><li>family – relationship difficulties, divorce or <a href="/conditions/social-care-and-support-guide/support-and-benefits-for-carers/">caring for someone</a></li><li>financial problems – unexpected bills or borrowing money</li><li>health – illness, injury or <a href="/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/grief-bereavement-loss/">losing someone</a> (bereavement)</li></ul><p>Even significant life events such as buying a house, having a baby or planning a wedding could lead to feelings of sadness.</p><p>You might find it hard to explain to people why you feel this way, but talking to someone could help you find a solution.</p><p><a href="/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/">Find out more about the 5 steps to mental wellbeing</a></p>
          <h3>Conditions related to low mood and depression</h3> <table> <thead> <tr> <th>Symptoms</th> <th>Possible cause</th> </tr> </thead> <tbody> <tr> <td>feeling low or depressed in a seasonal pattern, usually during winter</td> <td><a href="/conditions/seasonal-affective-disorder-sad/">seasonal affective disorder (SAD)</a></td> </tr> <tr> <td>feeling low or depressed after the birth of a child</td> <td><a href="/conditions/post-natal-depression/">postnatal depression</a></td> </tr> </tbody> </table>
        </div>

        <h1>Low mood, sadness and depression</h1>
        <div>
          <p><b>Most people feel low sometimes, but if it's affecting your life, there are things you can try that may help.</b></p><p>Support is also available if you're finding it hard to cope with low mood, sadness or depression.</p>
          <p>Symptoms of a general low mood may include feeling:</p><ul><li>sad</li><li>anxious or panicky</li><li><a href="/live-well/sleep-and-tiredness/">more tired than usual</a> or being unable to sleep</li><li>angry or frustrated</li><li>low on confidence or self-esteem</li></ul><p>A low mood often gets better after a few days or weeks.</p><p>It's usually possible to improve a low mood by making small changes in your life. For example, resolving something that's bothering you or getting more sleep.</p><h3>Symptoms of depression</h3><p>If you have a low mood that lasts 2 weeks or more, it could be a sign of <a href="/mental-health/conditions/depression-in-adults/overview/">depression</a>.</p><p>Other symptoms of depression may include:</p><ul><li>not getting any enjoyment out of life</li><li>feeling hopeless</li><li>not being able to concentrate on everyday things</li><li>having <a href="/mental-health/feelings-symptoms-behaviours/behaviours/help-for-suicidal-thoughts/">suicidal thoughts</a> or thoughts about <a href="/mental-health/feelings-symptoms-behaviours/behaviours/self-harm/getting-help/">harming yourself</a></li></ul>
          <div><h3>Do</h3><ul><li><p>try talking about your feelings to a friend, family member, health professional or counsellor. You could also contact <a href="https://www.samaritans.org/how-we-can-help/contact-samaritan/">Samaritans</a>, call <a href="Tel: 116 123">116 123</a> or email <a href="mailto:jo@samaritans.org">jo@samaritans.org</a> if you need someone to talk to</p></li><li><p>try the <a href="/mental-health/self-help/tips-and-support/how-to-be-happier/">6 ways to feel happier</a>, which are simple lifestyle changes to help you feel more in control and able to cope</p></li><li><p>find out <a href="/mental-health/self-help/tips-and-support/raise-low-self-esteem/">how to raise your self-esteem</a></p></li><li><p>consider peer support, where people use their experiences to help each other. <a href="https://www.mind.org.uk/information-support/drugs-and-treatments/peer-support/finding-peer-support/">Find out more about peer support on the Mind website</a></p></li><li><p>try <a href="/mental-health/self-help/tips-and-support/mindfulness/">mindfulness</a>, where you focus on the present moment</p></li><li><p>listen to <a href="/mental-health/self-help/guides-tools-and-activities/mental-wellbeing-audio-guides/">free mental wellbeing audio guides</a></p></li></ul></div>
          <p>If you need more support, you can get free talking therapies like <a href="/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt/overview/">cognitive behavioural therapy (CBT)</a> on the NHS.</p><p>You can refer yourself directly to an NHS talking therapies service without a referral from a GP.</p>
          <h3>See a GP if:</h3><div class="block-richtext"> <ul><li>you've had a low mood for more than 2 weeks</li><li>you're struggling to cope with a low mood</li><li>things you're trying yourself are not helping</li><li>you would prefer to get a referral from a GP</li></ul> </div>
          <h3>Ask for an urgent GP appointment or call 111 if:</h3><div class="block-richtext"> <ul><li>you need help urgently, but it's not an emergency</li></ul><p>111 can tell you the right place to get help if you need to see someone. Go to <a href="https://111.nhs.uk/">NHS 111 online</a> or call 111.</p> </div>
          <h3>Call 999 or go to A&amp;E now if:</h3><div class="block-richtext"> <ul><li>you or someone you know needs immediate help</li><li>you have seriously harmed yourself – for example, by taking a drug overdose</li></ul><p>A mental health emergency should be taken as seriously as a medical emergency.</p><p><a href="/Service-Search/Accident-and-emergency-services/LocationSearch/428">Find your nearest A&amp;E</a></p> </div>
          <p>There are many reasons why you might feel low at some point in your life.</p><p>Any sort of difficult event or experience could lead to sadness or low self-esteem. Sometimes it's possible to feel low without there being an obvious reason.</p><h3>Identifying the cause</h3><p>If you know what's causing your low mood it might be easier to find ways to manage it.</p><p>Some examples of things that may cause a low mood include:</p><ul><li>work – feeling pressure at work, unemployment or retirement</li><li>family – relationship difficulties, divorce or <a href="/conditions/social-care-and-support-guide/support-and-benefits-for-carers/">caring for someone</a></li><li>financial problems – unexpected bills or borrowing money</li><li>health – illness, injury or <a href="/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/grief-bereavement-loss/">losing someone</a> (bereavement)</li></ul><p>Even significant life events such as buying a house, having a baby or planning a wedding could lead to feelings of sadness.</p><p>You might find it hard to explain to people why you feel this way, but talking to someone could help you find a solution.</p><p><a href="/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/">Find out more about the 5 steps to mental wellbeing</a></p>
          <h3>Conditions related to low mood and depression</h3>
        </div>
        <div className="logo-container" style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href='https://www.nhs.uk/'><img src={nhsLogo} alt="NHS Logo" className="nhs" style={{ maxWidth: '200px' }} /></a>
        </div>
      </div> */}

    </div>
  )
}

export default MentalHealth
