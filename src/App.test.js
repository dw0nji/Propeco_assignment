import { render, screen } from '@testing-library/react';
import App from './App';
import Property from "./handleApiRequest";
import expect from "expect";
import React from 'react'

test('Gets details from the Prop Eco Api and populate it into our custom data type', async () => {
  const x = 34076006;
  const property = new Property();
  let data = await property.retrievePropertyInfo(x)
      .then(()=>{
            return true;
       }
      )
      .catch(()=>{return true;}) //display an error message here
  // ASSERT
  expect(data).toBeTruthy();
  expect(property.park.inPark).toBeFalsy();
  expect(property.park.nearest_national_park).toBe("South Downs");

})
