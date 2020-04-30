-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2020-04-24 20:42:17
-- 服务器版本： 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `miniprogram`
--

-- --------------------------------------------------------

--
-- 表的结构 `album`
--

CREATE TABLE `album` (
  `albumID` int(11) NOT NULL,
  `albumName` varchar(60) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `album`
--

INSERT INTO `album` (`albumID`, `albumName`) VALUES
(1, '玉渊潭公园'),
(2, '陶然亭公园'),
(3, '龙潭湖公园'),
(4, '陶然亭公园'),
(5, '景山公园'),
(6, '奥森公园'),
(7, '北海公园'),
(8, '故宫');

-- --------------------------------------------------------

--
-- 表的结构 `photo`
--

CREATE TABLE `photo` (
  `photoID` int(11) NOT NULL,
  `photoPath` varchar(128) CHARACTER SET utf8 NOT NULL,
  `photoDescription` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `albumID` int(11) NOT NULL,
  `username` varchar(60) CHARACTER SET utf8 NOT NULL,
  `useravatar` varchar(200) CHARACTER SET utf8 NOT NULL,
  `photoDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `photo`
--

INSERT INTO `photo` (`photoID`, `photoPath`, `photoDescription`, `albumID`, `username`, `useravatar`, `photoDate`) VALUES
(28, 'uploads/xueshan-1587681840.jpeg', '玉渊潭樱花真好看', 1, '小猫', '/images/poppy.jpg', '2020-04-27 14:59:26'),
(31, 'uploads/xueshan-1587682046.jpeg', '好久没来了', 3, 'xueshan', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqZjLcrj0O1D64wvvVeZkeb6cGxKTWQOurhyM8EpEUmOt4p8EMgZGibVxc6bGoDhQ6g8TUBAoo7FzQ/132', '2020-04-27 15:02:52'),
(32, 'uploads/xueshan-1587682047.jpeg', '好久没来了', 3, 'xueshan', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqZjLcrj0O1D64wvvVeZkeb6cGxKTWQOurhyM8EpEUmOt4p8EMgZGibVxc6bGoDhQ6g8TUBAoo7FzQ/132', '2020-04-27 15:02:54'),
(35, 'uploads/xueshan-1587682957.jpeg', 'spring flowers', 1, 'xueshan', 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqZjLcrj0O1D64wvvVeZkeb6cGxKTWQOurhyM8EpEUmOt4p8EMgZGibVxc6bGoDhQ6g8TUBAoo7FzQ/132', '2020-04-27 15:18:02'),
(37, 'uploads/xueshan-1587683501.jpeg', '冲鸭！', 3, '小猫', '/images/poppy.jpg', '2020-04-27 15:27:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`albumID`);

--
-- Indexes for table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`photoID`),
  ADD KEY `FK_ID` (`albumID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `album`
--
ALTER TABLE `album`
  MODIFY `albumID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `photo`
--
ALTER TABLE `photo`
  MODIFY `photoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- 限制导出的表
--

--
-- 限制表 `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `FK_ID` FOREIGN KEY (`albumID`) REFERENCES `album` (`albumID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
