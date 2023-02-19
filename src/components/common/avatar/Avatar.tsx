import { UserMeta } from '.prisma/client';
import PatternAbstract1 from '@/components/common/avatar/patterns/PatternAbstract1';
import PatternAbstract2 from '@/components/common/avatar/patterns/PatternAbstract2';
import PatternBullseye from '@/components/common/avatar/patterns/PatternBullseye';
import PatternCheckers from '@/components/common/avatar/patterns/PatternCheckers';
import PatternCircleCorners from '@/components/common/avatar/patterns/PatternCircleCorners';
import PatternCirclesB from '@/components/common/avatar/patterns/PatternCirclesB';
import PatternCirclesL from '@/components/common/avatar/patterns/PatternCirclesL';
import PatternCirclesR from '@/components/common/avatar/patterns/PatternCirclesR';
import PatternCirclesT from '@/components/common/avatar/patterns/PatternCirclesT';
import PatternConcentricPointies from '@/components/common/avatar/patterns/PatternConcentricPointies';
import PatternConcentricStars from '@/components/common/avatar/patterns/PatternConcentricStars';
import PatternCornersBL from '@/components/common/avatar/patterns/PatternCornersBL';
import PatternCornersBR from '@/components/common/avatar/patterns/PatternCornersBR';
import PatternCornersTL from '@/components/common/avatar/patterns/PatternCornersTL';
import PatternCornersTR from '@/components/common/avatar/patterns/PatternCornersTR';
import PatternCubes from '@/components/common/avatar/patterns/PatternCubes';
import PatternDiagStripes from '@/components/common/avatar/patterns/PatternDiagStripes';
import PatternDiamondTwirl1 from '@/components/common/avatar/patterns/PatternDiamondTwirl1';
import PatternDiamondTwirl2 from '@/components/common/avatar/patterns/PatternDiamondTwirl2';
import PatternDiamondsConcentric from '@/components/common/avatar/patterns/PatternDiamondsConcentric';
import PatternDotsOrdered from '@/components/common/avatar/patterns/PatternDotsOrdered';
import PatternDotsRandom from '@/components/common/avatar/patterns/PatternDotsRandom';
import PatternEye from '@/components/common/avatar/patterns/PatternEye';
import PatternPyramidEye from '@/components/common/avatar/patterns/PatternPyramidEye';
import PatternRaysCenter from '@/components/common/avatar/patterns/PatternRaysCenter';
import PatternRaysB from '@/components/common/avatar/patterns/PatternRaysB';
import PatternRaysL from '@/components/common/avatar/patterns/PatternRaysL';
import PatternRaysR from '@/components/common/avatar/patterns/PatternRaysR';
import PatternRaysT from '@/components/common/avatar/patterns/PatternRaysT';
import PatternSwirl from '@/components/common/avatar/patterns/PatternSwirl';
import PatternTriPi from '@/components/common/avatar/patterns/PatternTriPi';
import PatternWaveH from '@/components/common/avatar/patterns/PatternWaveH';
import PatternWaveV from '@/components/common/avatar/patterns/PatternWaveV';

type Props = {
  userMeta: UserMeta;
};

const Avatar: React.FC<Props> = ({ userMeta }) => {
  const getHexfromRGBVals = (r: number, g: number, b: number): string => {
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  };
  const {
    avatarColor1r,
    avatarColor1g,
    avatarColor1b,
    avatarColor2r,
    avatarColor2g,
    avatarColor2b,
    avatarColor3r,
    avatarColor3g,
    avatarColor3b,
  } = userMeta;
  const colors = {
    color1: getHexfromRGBVals(avatarColor1r, avatarColor1g, avatarColor1b),
    color2: getHexfromRGBVals(avatarColor2r, avatarColor2g, avatarColor2b),
    color3: getHexfromRGBVals(avatarColor3r, avatarColor3g, avatarColor3b),
  };
  const { avatarPattern } = userMeta;
  return (
    <div className="round w-full h-full bg-yellow border-2 border-base dark-border-gray-2 hover-zoom hover-border-teal dark-hover-border-yellow">
      {avatarPattern === 0 && <PatternDiagStripes colors={colors} />}
      {avatarPattern === 1 && <PatternWaveH colors={colors} />}
      {avatarPattern === 2 && <PatternWaveV colors={colors} />}
      {avatarPattern === 3 && <PatternBullseye colors={colors} />}
      {avatarPattern === 4 && <PatternDiamondsConcentric colors={colors} />}
      {avatarPattern === 5 && <PatternDiamondTwirl1 colors={colors} />}
      {avatarPattern === 6 && <PatternDiamondTwirl2 colors={colors} />}
      {avatarPattern === 7 && <PatternCornersTL colors={colors} />}
      {avatarPattern === 8 && <PatternCornersTR colors={colors} />}
      {avatarPattern === 9 && <PatternCornersBR colors={colors} />}
      {avatarPattern === 10 && <PatternCornersBL colors={colors} />}
      {avatarPattern === 11 && <PatternDotsOrdered colors={colors} />}
      {avatarPattern === 12 && <PatternConcentricPointies colors={colors} />}
      {avatarPattern === 13 && <PatternConcentricStars colors={colors} />}
      {avatarPattern === 14 && <PatternTriPi colors={colors} />}
      {avatarPattern === 15 && <PatternDotsRandom colors={colors} />}
      {avatarPattern === 16 && <PatternRaysT colors={colors} />}
      {avatarPattern === 17 && <PatternRaysR colors={colors} />}
      {avatarPattern === 18 && <PatternRaysB colors={colors} />}
      {avatarPattern === 19 && <PatternRaysL colors={colors} />}
      {avatarPattern === 20 && <PatternEye colors={colors} />}
      {avatarPattern === 21 && <PatternPyramidEye colors={colors} />}
      {avatarPattern === 22 && <PatternCircleCorners colors={colors} />}
      {avatarPattern === 23 && <PatternCirclesR colors={colors} />}
      {avatarPattern === 24 && <PatternCirclesB colors={colors} />}
      {avatarPattern === 25 && <PatternCirclesL colors={colors} />}
      {avatarPattern === 26 && <PatternCirclesT colors={colors} />}
      {avatarPattern === 27 && <PatternCubes colors={colors} />}
      {avatarPattern === 28 && <PatternCheckers colors={colors} />}
      {avatarPattern === 29 && <PatternAbstract1 colors={colors} />}
      {avatarPattern === 30 && <PatternAbstract2 colors={colors} />}
      {avatarPattern === 31 && <PatternRaysCenter colors={colors} />}
      {avatarPattern === 32 && <PatternSwirl colors={colors} />}
    </div>
  );
};

export default Avatar;
