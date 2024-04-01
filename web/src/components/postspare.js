import React, { useState } from 'react';
import "../css/post.css"
import UserIcon from "../assets/images/UserIcon.png"
function Post() {
  const [liked, setLike] = useState(false);

  const handleLike = () => {
    setLike(!liked);
  };

  const [flagged, setFlag] = useState(false);

  const handleFlag = () => {
    setFlag(!flagged);
  };
  return (
    <div className = "PostHolder">
      {/*Insert users profile picture here */}<div className="imgHolder"><img src={UserIcon} /></div>
      <div className="Postinfo">
        {/*Insert post title here */} <h3 className="PostTitle">Happiness</h3>
        <div className="infoContent"><p>dgsi fodj sdjfids jiofnioa hg iohparuiogbuah bpaoiidfsn nje fnsjfknsndfj nsk fnsn fdk slnfd kskd fnsanfdknas kdfna dfknasdkf nsdanf ksadn fknas dkfnask nfdksnf kdnsafkl nas;lf nads;n fdas nfksadn fn;asdnf;aldfn;ansfd ndnfasndfla ndfln asnf asnfd ;lasnf d;nasdfk; adfdklasn f;las flk;andsfkl nasdnf kas f;ldnaks nfd;ak nsflkdan s;kfldn aklsdnf ;asdn fl;aks nf u phg iowah nuifp hnaw uibhefubqwu brigf ehrifje hgbrgui bg uihqe ugta ehig prqhuiri hh rp ibaeur buiarh angrjg nabgur aug boib g oa</p></div>
      </div>
      {/*Insert users Name here */} <h3 className="Name">Jane</h3>
      <button className={`likeButton ${liked ? 'clicked' : ''}`} onClick={handleLike}>
      </button>
      <button className={`flag ${flagged ? 'clicked' : ''}`} onClick={handleFlag}>
      </button>       
      {/*Insert date posted here */} <h4 className="PostDate">01/04/24</h4>
    </div>
  )
}

export default Post