import React from 'react'
import Navbar from './Component/Navbar'
import './Home1.css'
const Home1 = () => {
  return (
    <>
    <Navbar/>
    <div className="home-container">
      <div className="home-header">
        <div className="left-header">
            <h3>Engaging Classroom Quiz Activities for Fun</h3>
            <h3>and Collaboration</h3>
            <p>Offers a range of enhancements aimed at fostering practice and test preparation, in</p>
            <p>addition to the beloved student engagement features highly valued by educators</p>
            <div className="button-x">
              <a href="SignUp"><button>Try For Free</button></a>
              <button>Learn More</button>
            </div>
            <p>Try it free for 15 days. No credit card required.</p>
        </div>
        <div className="right-header">
             <img src="/images/img1.png" alt="" />
        </div>
      </div>
      <div className="header-down">
        <h2>Maximize The Benefits For Your School by Leveraging The Full Potential of OpenEduCat</h2>
        <div className="header-down-card">
          <div className="card">
            <img src="/images/img2.svg" alt="" />
            <p>Enhancing Assessment and Practice With a Focus On Equity</p>
          </div>
          <div className="card">
            <img src="/images/img3.svg" alt="" />
            <p>Insights Through Standards-Based Reports and Data-Driven Instruction</p>
          </div>
          <div className="card">
            <img src="/images/img4.svg" alt="" />
            <p>Ensuring Alignment and Universal Access For Teachers Across Campuses</p>
          </div>
        </div>
      </div>


      <div className="header-center-element">
        <h2>Types of Quiz Questions To Use In Your eLearning Course</h2>
        <br />
        <p>Quiz questions are an effective way to assess and reinforce learning in an eLearning course.They can vary in format and complexity to suit</p>
        <p>the specific learning objectives and content of your course.</p>
      </div>

      <div className="header-center-down">
        <div className="header-center-left">
          <div className="img-x">
            <img src="/images/img7.png" alt="" />
          </div>
          <div className="img-y">
            <img src="/images/img10.png" alt="" />
           </div>
        </div>
        <div className="header-center-right">
           <h1> ✓ Security Alert</h1>
           <p>In a Fill in the Blank question, students are presented with a phrase, sentence, or paragraph that includes a blank space. Their task is to supply the missing word or words to complete the given text.</p>
           <h1>✓ Update Quiz</h1>
           <p>OpenEduCat Quiz offers the flexibility of including optional questions in the examination question paper, granting examinees the freedom to choose among these options to fulfil the specified number of questions to be answered.</p>
        </div>
      </div>




      <div className="header-center-down">
        <div className="header-center-left">
          <div className="img-x">
            <img src="/images/img9.png" alt="" />
          </div>
          <div className="img-y">
            <img src="/images/img10.png" alt="" />
           </div>
        </div>
        <div className="header-center-right">
           <h1> ✓ Active Quiz</h1>
           <p>In a Fill in the Blank question, students are presented with a phrase, sentence, or paragraph that includes a blank space. Their task is to supply the missing word or words to complete the given text.</p>
           <h1>✓ Update Quiz</h1>
           <p>OpenEduCat Quiz offers the flexibility of including optional questions in the examination question paper, granting examinees the freedom to choose among these options to fulfil the specified number of questions to be answered.</p>
        </div>
      </div>





      <div className="header-center-down">
        <div className="header-center-left">
          <div className="img-x">
            <img src="/images/img11.png" alt="" />
          </div>
          <div className="img-y">
            <img src="/images/img12.png" alt="" />
           </div>
        </div>
        <div className="header-center-right">
           <h1> ✓ Add New Quiz</h1>
           <p>In a Fill in the Blank question, students are presented with a phrase, sentence, or paragraph that includes a blank space. Their task is to supply the missing word or words to complete the given text.</p>
           <h1>✓ Add New Question</h1>
           <p>OpenEduCat Quiz offers the flexibility of including optional questions in the examination question paper, granting examinees the freedom to choose among these options to fulfil the specified number of questions to be answered.</p>
        </div>
      </div>


      <div className="header-center-down">
        <div className="header-center-left">
          <div className="img-x">
            <img src="/images/img13.png" alt="" />
          </div>
          <div className="img-y">
            <img src="/images/img14.png" alt="" />
           </div>
        </div>
        <div className="header-center-right">
           <h1> ✓ All Quiz</h1>
           <p>In a Fill in the Blank question, students are presented with a phrase, sentence, or paragraph that includes a blank space. Their task is to supply the missing word or words to complete the given text.</p>
           <h1>✓ All Category</h1>
           <p>OpenEduCat Quiz offers the flexibility of including optional questions in the examination question paper, granting examinees the freedom to choose among these options to fulfil the specified number of questions to be answered.</p>
        </div>
      </div>
       <div className="footer-upper-img">
        <img src="/images/img5.png" alt="" />
        <img src="/images/img6.png" alt="" />
       </div>

        <div className="footer">
          <h1>Get In Touch</h1>
           <div className="footer-card">
            <div className="footer-card1">
            <h1>USA</h1>
            <h3>⚲ location
            2803 Philadelphia Pike,Suite B #1117, Claymont, DE 19703, USA</h3>
            <h3>✆+1-302-449-4844</h3>
            <h3>✉info@openexam.org</h3>
            </div>
            <div className="footer-card1">
            <h1>India</h1>
            <h3>⚲ location
            2803 Philadelphia Pike,Suite B #1117, Claymont, DE 19703, USA</h3>
            <h3>✆+1-302-449-4844</h3>
            <h3>✉info@openexam.org</h3>
            </div>
            <div className="footer-card1">
             <h1>NewsLetter</h1>
             <input type="email" placeholder='Enter Email...'/> <button>Send</button>
             <h3>Subscribe to our newsletter and stay updated on the latest developments.</h3>
            </div>
           </div>
          </div>
    </div>
    </>
  )
}

export default Home1