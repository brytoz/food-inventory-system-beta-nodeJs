import React, { Fragment, useState, useEffect } from "react";

function Home() {

  useEffect(() => {
    window.location.replace('/')
  
  }, []);
  
  return( <Fragment>
    <div>Loading...</div></Fragment>);
}

export default Home;
