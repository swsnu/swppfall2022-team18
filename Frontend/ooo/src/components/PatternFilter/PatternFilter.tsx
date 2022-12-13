import React, { useState, useEffect } from "react";

export interface IProps {
	pattern: string | null;
	selectHandler: (value: string | null) => void;
}

const PatternFilter = (props: IProps) => {
	const pattern = props.pattern == null ? "패턴 종류" : props.pattern;

	const PatternOptions = [
		{ value: "패턴 종류" },
		{ value: "None" },
		{ value: "로고" },
		{ value: "스트라이프" },
		{ value: "체크" },
		{ value: "자수" },
	];
	return (
		<>
			<select
				id="pattern-select"
				data-testid="pattern-select"
				onChange={(e) => props.selectHandler(e.target.value)}
				value={pattern}
			>
				{PatternOptions.map((option, index) => (
					<option key={index} value={option.value}>
						{option.value}
					</option>
				))}
			</select>
		</>
	);
};

export default PatternFilter;
