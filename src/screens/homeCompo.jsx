import SubscribeComponent from "../components/subscribeCompo";
import OurTeamComponent from "../components/ourTeamCompo";
import HomeIntroComponent from "../components/homeIntroCompo";
import MiddleComponent from "../components/middileSectionCompo";
import ServicesComponent from "../components/servicesCompo";

const HomeScreenComponent = () => {
  
  return (
    <>
      <HomeIntroComponent />
      <div id="services"><ServicesComponent /></div>
      <div id="features"><MiddleComponent /></div>
      <div id="team"><OurTeamComponent /></div>
      <SubscribeComponent></SubscribeComponent>
    </>
  );
};
export default HomeScreenComponent;
