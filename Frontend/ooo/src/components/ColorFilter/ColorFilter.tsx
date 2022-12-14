import React, { useState, useEffect } from "react";
import { GithubPicker } from "react-color";

export interface IProps {
	selectHandler: (value: string | null) => void;
	color: string | null;
}

const ColorFilter = (props: IProps) => {
	const [color, setColor] = useState<string | null>("");
	const [colorHex, setColorHex] = useState<string>("");

	const NullTypeOptions = [{ value: "세부 종류" }];

	useEffect(() => {
		setColor(props.color);
	}, [props]);

	const COLOROPTIONS = [
		"#0e0e0e",
		"#9c9c9b",
		"#011e66",
		"#2508ff",
		"#1f4582",
		"#b5cbde",
		"#242d42",
		"#5b5a34",
		"#06b002",
		"#7f290c",
		"#ff0000",
		"#fe2900",
		"#feea00",
		"#f1c276",
		"#feffed",
		"#ffffff",
		"#570070",
		"#ff00a1",
		"#00c4ab",
	];
	const COLORREF = [
		"블랙",
		"그레이",
		"네이비",
		"블루",
		"데님",
		"연청",
		"진청",
		"카키",
		"그린",
		"브라운",
		"레드",
		"오렌지",
		"옐로우",
		"베이지",
		"아이보리",
		"화이트",
		"퍼플",
		"핑크",
		"민트",
	];

	const colorHandler = (clickedColor: any) => {
		setColorHex(clickedColor.hex);
		const colorIdx = COLOROPTIONS.findIndex((item) => item == clickedColor.hex);
		props.selectHandler(COLORREF[colorIdx]);
		setColor(COLORREF[colorIdx]);
		console.log(color);
	};

	return (
		<>
			<div>
				<GithubPicker
					data-testid="cloth-info-input-color"
					color={colorHex}
					colors={COLOROPTIONS}
					onChange={colorHandler}
				/>
			</div>
		</>
	);
};

export default ColorFilter;
