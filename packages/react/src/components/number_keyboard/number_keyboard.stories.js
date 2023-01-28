import { storiesOf } from "@storybook/react";
import React from 'react';
import NumberKeyboard from "./number_keyboard";

storiesOf('Number Keyboard', module)
  .add('default', () => {
    return (
      <NumberKeyboard
        onKeyClick={() => { }}
        onBack={() => { }}
        onClear={() => { }}
        onConfirm={() => { }}
        onWidth={() => { }}
      />
    )
  })
  .add('decimal', () => {
    return (
      <NumberKeyboard
        onKeyClick={() => { }}
        onBack={() => { }}
        onClear={() => { }}
        onConfirm={() => { }}
        onWidth={() => { }}
        decimal
      />
    )
  })
  .add('decimal and weigh', () => {
    return (
      <NumberKeyboard
        onKeyClick={() => { }}
        onBack={() => { }}
        onClear={() => { }}
        onConfirm={() => { }}
        onWidth={() => { }}
        decimal
        weigh
      />
    )
  })