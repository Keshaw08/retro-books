import * as React from 'react';
import { createElement } from "react";
import { setup, styled } from "goober";
declare var require: any

const img =  require("../Assets/heart.png");

setup(createElement);

export interface HeartProp {
	isClick: boolean;
	styles?: any;
	onClick: () => void;
}

const HeartUI = (styled('div') as any)(({ isClick, styles }: Partial<HeartProp>) => [
	{
		width: '100px',
		height: '100px',
		background: `url(${img}) no-repeat`,
		cursor: 'pointer',
		display: 'inline-block'
	},
	isClick && {
		backgroundPosition: '-2799px 2px',
		transition: 'background 0.5s steps(28)'
	},
	styles
]);

export default function Heart({ isClick, onClick, styles }: HeartProp) {
	return <HeartUI isClick={isClick} onClick={onClick} styles={styles} />;
}