"use client";



import SubscribeComponent from "../components/subscribeCompo";
import OurTeamComponent from "../components/ourTeamCompo";
import HomeIntroComponent from "../components/homeIntroCompo";
import MiddleComponent from "../components/middileSectionCompo";
import ServicesComponent from "../components/servicesCompo";

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
