import HomeIntroComponent from "../components/homeIntroCompo";
import ServicesComponent from "../components/servicesCompo";
import MiddleComponent from "../components/middileSectionCompo";
import OurTeamComponent from "../components/ourTeamCompo";
import SubscribeComponent from "../components/subscribeCompo";

const HomeScreenComponent = () => {
  return (
    <>
      <HomeIntroComponent></HomeIntroComponent>
      <ServicesComponent></ServicesComponent>
      <MiddleComponent></MiddleComponent>
      <OurTeamComponent></OurTeamComponent>
      <SubscribeComponent></SubscribeComponent>
    </>
  );
};
export default HomeScreenComponent;
