import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-DRDqcPuo.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<blockquote><p>源自IT黑马的一份 Oracle 笔记，还挺详细的，很适合 Oracle 的入门</p></blockquote><h2 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作"><span>基本操作</span></a></h2><h3 id="表空间、用户、表" tabindex="-1"><a class="header-anchor" href="#表空间、用户、表"><span><strong>表空间、用户、表</strong></span></a></h3><ul><li><strong>创建表空间</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>create tablespace oraclets</span></span>
<span class="line"><span>datafile &#39;c:\\itheima.dbf&#39;</span></span>
<span class="line"><span>size 100m</span></span>
<span class="line"><span>autoextend on</span></span>
<span class="line"><span>next 10m;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>删除表空间</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>drop tablespace oraclets;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><strong>创建用户</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>create user oracleuser</span></span>
<span class="line"><span>identified by oraclepassword</span></span>
<span class="line"><span>default tablespace oraclets;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>给用户授权</strong></li></ul><p><em><strong>oracle数据库常用角色</strong>:<br> connect--连接角色，基本角色<br> resource--开发者角色<br> dba--超级管理员角色</em></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>--给用户授予dba角色</span></span>
<span class="line"><span>grant dba to oracleuser;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>创建一个person表</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>create table person(</span></span>
<span class="line"><span>       pid number(20),</span></span>
<span class="line"><span>       pname varchar2(10)</span></span>
<span class="line"><span>);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>修改表结构</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---添加一列</span></span>
<span class="line"><span>alter table person add (gender number(1));</span></span>
<span class="line"><span>---修改列类型</span></span>
<span class="line"><span>alter table person modify gender char(1);</span></span>
<span class="line"><span>---修改列名称</span></span>
<span class="line"><span>alter table person rename column gender to sex;</span></span>
<span class="line"><span>---删除一列</span></span>
<span class="line"><span>alter table person drop column sex;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据操作" tabindex="-1"><a class="header-anchor" href="#数据操作"><span><strong>数据操作</strong></span></a></h3><ul><li><strong>查询表中记录</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select * from person;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><strong>添加一条记录</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>insert into person (pid, pname) values (1, &#39;小明&#39;);</span></span>
<span class="line"><span>commit;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>更新一条记录</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>update person set pname = &#39;小红&#39; where pid = 1;</span></span>
<span class="line"><span>commit;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>删除表、记录</strong>*</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>--删除表中全部记录</span></span>
<span class="line"><span>delete from person;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--删除表结构</span></span>
<span class="line"><span>drop table person;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--先删除表，再次创建表。效果等同于删除表中全部记录</span></span>
<span class="line"><span>--在数据量大的情况下，尤其在表中带有索引的情况下，该操作效率高</span></span>
<span class="line"><span>--索引可以提供查询效率，但是会影响增删改效率</span></span>
<span class="line"><span>truncate table person;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>解锁Oracle专有的scott用户</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>--解锁scott用户，密码默认是tiger</span></span>
<span class="line"><span>alter user scott account unlock;</span></span>
<span class="line"><span>--解锁scott用户的密码【此句也可以用来重置密码】</span></span>
<span class="line"><span>alter user scott identified by tiger;</span></span>
<span class="line"><span>--切换到scott用户</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="序列" tabindex="-1"><a class="header-anchor" href="#序列"><span><strong>序列</strong></span></a></h3><blockquote><p>序列不真的属于任何一张表，但是可以逻辑和表做绑定</p></blockquote><p>序列默认从1开始，依次递增，主要用来给主键赋值使用<br> dual是虚表，只是为了补全语法，没有任何意义</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>create sequence s_person;</span></span>
<span class="line"><span>select s_person.nextval from dual;</span></span>
<span class="line"><span>----添加一条记录</span></span>
<span class="line"><span>insert into person (pid, pname) values (s_person.nextval, &#39;小明&#39;);</span></span>
<span class="line"><span>commit;</span></span>
<span class="line"><span>select * from person;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单行函数" tabindex="-1"><a class="header-anchor" href="#单行函数"><span><strong>单行函数</strong></span></a></h3><blockquote><p>作用于一行，返回一个值</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---字符函数</span></span>
<span class="line"><span>select upper(&#39;yes&#39;) from dual;    --YES</span></span>
<span class="line"><span>select lower(&#39;YES&#39;) from dual;    --yes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---数值函数</span></span>
<span class="line"><span>select round(56.16, -2) from dual;   ---四舍五入，后面的参数表示保留的位数</span></span>
<span class="line"><span>select trunc(56.16, -1) from dual;   ---直接截取，不在看后面数字</span></span>
<span class="line"><span>select mod(10, 3) from dual;         ---求余</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---日期函数</span></span>
<span class="line"><span>----查询出emp表中所有员工入职距离现在还有几天</span></span>
<span class="line"><span>select sysdate-e.hiredate from emp e;</span></span>
<span class="line"><span>----算出明天此刻</span></span>
<span class="line"><span>select sysdate+1 from dual;</span></span>
<span class="line"><span>----查询出emp表中所有员工入职距离现在几月</span></span>
<span class="line"><span>select months_between(sysdate,e.hiredate) from emp e;</span></span>
<span class="line"><span>----查询出emp表中所有员工入职距离现在几年</span></span>
<span class="line"><span>select months_between(sysdate,e.hiredate)/12 from emp e;</span></span>
<span class="line"><span>----查询出emp表中所有员工入职距离现在几周</span></span>
<span class="line"><span>select round((sysdate-e.hiredate)/7) from emp e;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---转换函数</span></span>
<span class="line"><span>----日期转字符串</span></span>
<span class="line"><span>select to_char(sysdate, &#39;fm yyyy-mm-dd hh24:mi:ss&#39;) from dual;</span></span>
<span class="line"><span>----字符串转日期</span></span>
<span class="line"><span>select to_date(&#39;2018-6-7 16:39:50&#39;, &#39;fm yyyy-mm-dd hh24:mi:ss&#39;) from dual;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---通用函数</span></span>
<span class="line"><span>----算出emp表中所有员工的年薪</span></span>
<span class="line"><span>----奖金里面有null值，如果null值和任意数字做算数运算，结果都是null</span></span>
<span class="line"><span>select e.sal*12+nvl(e.comm, 0) from emp e;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="条件表达式" tabindex="-1"><a class="header-anchor" href="#条件表达式"><span><strong>条件表达式</strong></span></a></h3><blockquote><p>条件表达式的通用写法，Mysql和Oracle通用</p></blockquote><p>Oracle中除了起别名，都用单引号</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---给emp表中员工起中文字</span></span>
<span class="line"><span>select e.ename, </span></span>
<span class="line"><span>       case e.ename</span></span>
<span class="line"><span>         when &#39;SMITH&#39; then &#39;曹贼&#39;</span></span>
<span class="line"><span>           when &#39;ALLEN&#39; then &#39;大耳贼&#39;</span></span>
<span class="line"><span>             when &#39;WARD&#39; then &#39;诸葛小儿&#39;</span></span>
<span class="line"><span>               --else &#39;无名&#39;</span></span>
<span class="line"><span>                 end</span></span>
<span class="line"><span>from emp e;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---判断emp表中员工工资，如果高于3000显示高收入，如果高于1500低于3000显示中等收入</span></span>
<span class="line"><span>-----其余显示低收入</span></span>
<span class="line"><span>select e.sal, </span></span>
<span class="line"><span>       case </span></span>
<span class="line"><span>         when e.sal&gt;3000 then &#39;高收入&#39;</span></span>
<span class="line"><span>           when e.sal&gt;1500 then &#39;中等收入&#39;</span></span>
<span class="line"><span>               else &#39;低收入&#39;</span></span>
<span class="line"><span>                 end</span></span>
<span class="line"><span>from emp e;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>----Oracle专用条件表达式</span></span>
<span class="line"><span>select e.ename, </span></span>
<span class="line"><span>        decode(e.ename,</span></span>
<span class="line"><span>          &#39;SMITH&#39;,  &#39;曹贼&#39;,</span></span>
<span class="line"><span>            &#39;ALLEN&#39;,  &#39;大耳贼&#39;,</span></span>
<span class="line"><span>              &#39;WARD&#39;,  &#39;诸葛小儿&#39;,</span></span>
<span class="line"><span>                &#39;无名&#39;) &quot;中文名&quot;             </span></span>
<span class="line"><span>from emp e;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="聚合函数" tabindex="-1"><a class="header-anchor" href="#聚合函数"><span><strong>聚合函数</strong></span></a></h3><blockquote><p>作用于多行，返回一个值</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select count(1) from emp;    ---查询总数量，count(1)就是count主键</span></span>
<span class="line"><span>select sum(sal) from emp;    ---工资总和</span></span>
<span class="line"><span>select max(sal) from emp;    ---最大工资</span></span>
<span class="line"><span>select min(sal) from emp;    ---最低工资</span></span>
<span class="line"><span>select avg(sal) from emp;    ---平均工资</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分组查询" tabindex="-1"><a class="header-anchor" href="#分组查询"><span><strong>分组查询</strong></span></a></h3><blockquote><p>分组查询中，出现在group by后面的原始列，才能出现select后面</p></blockquote><p>没有出现在group by后面的列，想在select后面，必须加上聚合函数<br> 聚合函数有一个特性，可以把多行记录变成一个值<br> where是过滤分组前的数据，having是过滤分组后的数据<br> where不许在group by之前，having是在group by之后</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---查询出每个部门的平均工资</span></span>
<span class="line"><span>select e.deptno, avg(e.sal)</span></span>
<span class="line"><span>from emp e</span></span>
<span class="line"><span>group by e.deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---查询出平均工资高于两千的部门信息</span></span>
<span class="line"><span>select e.deptno, avg(e.sal) asal</span></span>
<span class="line"><span>from emp e</span></span>
<span class="line"><span>group by e.deptno</span></span>
<span class="line"><span>having avg(e.sal)&gt;2000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---查询出每个部门工资高于800的员工的平均工资</span></span>
<span class="line"><span>select e.deptno, avg(e.sal) asal</span></span>
<span class="line"><span>from emp e</span></span>
<span class="line"><span>where e.sal&gt;800</span></span>
<span class="line"><span>group by e.deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---查询出每个部门工资高于800的员工的平均工资</span></span>
<span class="line"><span>---再查询出在平均工资高于2000的部门</span></span>
<span class="line"><span>select e.deptno, avg(e.sal) asal</span></span>
<span class="line"><span>from emp e</span></span>
<span class="line"><span>where e.sal&gt;800</span></span>
<span class="line"><span>group by e.deptno</span></span>
<span class="line"><span>having avg(e.sal)&gt;2000;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多表查询" tabindex="-1"><a class="header-anchor" href="#多表查询"><span><strong>多表查询</strong></span></a></h3><ul><li><strong>笛卡尔积</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select *</span></span>
<span class="line"><span>from emp e, dept d;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>等值连接</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select *</span></span>
<span class="line"><span>from emp e, dept d</span></span>
<span class="line"><span>where e.deptno=d.deptno;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>内连接</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select *</span></span>
<span class="line"><span>from emp e inner join dept d</span></span>
<span class="line"><span>on e.deptno = d.deptno;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>外连接</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---查询所有部门，以及部门下的员工信息</span></span>
<span class="line"><span></span></span>
<span class="line"><span>----右外连接</span></span>
<span class="line"><span>select *</span></span>
<span class="line"><span>from emp e right join dept d</span></span>
<span class="line"><span>on e.deptno=d.deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---左外连接</span></span>
<span class="line"><span>select *</span></span>
<span class="line"><span>from emp e left join dept d</span></span>
<span class="line"><span>on e.deptno=d.deptno;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>Oracle专用外连接</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---左外连接</span></span>
<span class="line"><span>select *</span></span>
<span class="line"><span>from emp e, dept d</span></span>
<span class="line"><span>where e.deptno(+) = d.deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---右外连接</span></span>
<span class="line"><span>select *</span></span>
<span class="line"><span>from emp e, dept d</span></span>
<span class="line"><span>where e.deptno = d.deptno(+);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>自连接</strong></li></ul><blockquote><p>自连接其实就是站在不同的角度把一张表看成多张表</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select * from emp;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---查询出员工姓名，员工领导姓名</span></span>
<span class="line"><span>select e1.ename, e2.ename</span></span>
<span class="line"><span>from emp e1, emp e2</span></span>
<span class="line"><span>where e1.mgr = e2.empno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>------查询出员工姓名，员工部门名称，员工领导姓名，员工领导部门名称</span></span>
<span class="line"><span>select e1.ename, d1.dname, e2.ename, d2.dname</span></span>
<span class="line"><span>from emp e1, emp e2, dept d1, dept d2</span></span>
<span class="line"><span>where e1.mgr = e2.empno</span></span>
<span class="line"><span>and e1.deptno=d1.deptno</span></span>
<span class="line"><span>and e2.deptno=d2.deptno;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>子查询</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---子查询返回一个值</span></span>
<span class="line"><span>----查询出工资和scott一样的员工信息</span></span>
<span class="line"><span>select * from emp where sal in</span></span>
<span class="line"><span>(select sal from emp where ename = &#39;SCOTT&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---子查询返回一个集合</span></span>
<span class="line"><span>----查询出工资和10号部门任一员工一样的员工信息</span></span>
<span class="line"><span>select * from emp where sal in</span></span>
<span class="line"><span>(select sal from emp where deptno = 10);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---子查询返回一张表</span></span>
<span class="line"><span>----查询出每个部门最低工资，和最低工资员工姓名，和该员工所在部门名称</span></span>
<span class="line"><span>----1.先查询每个部门最低工资</span></span>
<span class="line"><span>select deptno, min(sal) msal</span></span>
<span class="line"><span>from emp </span></span>
<span class="line"><span>group by deptno;</span></span>
<span class="line"><span>----2.三表联查，得到最终结果</span></span>
<span class="line"><span>select t.deptno, t.msal, e.ename, d.dname</span></span>
<span class="line"><span>from (select deptno, min(sal) msal</span></span>
<span class="line"><span>      from emp </span></span>
<span class="line"><span>      group by deptno) t, emp e, dept d</span></span>
<span class="line"><span>where t.deptno = e.deptno</span></span>
<span class="line"><span>and t.msal = e.sal</span></span>
<span class="line"><span>and e.deptno = d.deptno;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="oracle中的分页" tabindex="-1"><a class="header-anchor" href="#oracle中的分页"><span><strong>Oracle中的分页</strong></span></a></h3><blockquote><p>rownum( 行号 )</p></blockquote><p>当我们做select操作的时候，每查询出一行记录，就会在该行上加上一个行号，<br> 行号从1开始，依次递增，不能跳着走<br> rownum不能写上大于一个正数</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>----排序操作会影响rownum的顺序</span></span>
<span class="line"><span>select rownum, e.* from emp e order by e.sal desc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>----如果涉及到排序，但是还要使用rownum的话，我们再次嵌套查询</span></span>
<span class="line"><span>select rownum, t.* from(</span></span>
<span class="line"><span>select rownum, e.* from emp e order by e.sal desc) t;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>----emp表工资倒叙排列后，每页五条记录，查询第二页</span></span>
<span class="line"><span>select * from(</span></span>
<span class="line"><span>    select rownum rn, tt.* from(</span></span>
<span class="line"><span>          select * from emp order by sal desc</span></span>
<span class="line"><span>    ) tt where rownum&lt;11</span></span>
<span class="line"><span>) where rn&gt;5</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="视图、索引" tabindex="-1"><a class="header-anchor" href="#视图、索引"><span><strong>视图、索引</strong></span></a></h3><ul><li><strong>视图</strong></li></ul><blockquote><p>视图就是提供一个查询的窗口，所有数据来自于原表。</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---查询语句创建表</span></span>
<span class="line"><span>create table emp as select * from scott.emp;</span></span>
<span class="line"><span>select * from emp;</span></span>
<span class="line"><span>---创建视图【必须有dba权限】</span></span>
<span class="line"><span>create view v_emp as select ename, job from emp;</span></span>
<span class="line"><span>---查询视图</span></span>
<span class="line"><span>select * from v_emp;</span></span>
<span class="line"><span>---修改视图[不推荐]</span></span>
<span class="line"><span>update v_emp set job=&#39;CLERK&#39; where ename=&#39;ALLEN&#39;;</span></span>
<span class="line"><span>commit;</span></span>
<span class="line"><span>---创建只读视图</span></span>
<span class="line"><span>create view v_emp1 as select ename, job from emp with read only;</span></span>
<span class="line"><span>---视图的作用</span></span>
<span class="line"><span>---第一：视图可以屏蔽掉一些敏感字段。</span></span>
<span class="line"><span>---第二：保证总部和分部数据及时统一。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>索引</strong></li></ul><blockquote><p>索引就是在表的列上构建一个二叉树,达到大幅度提高查询效率的目的，但是索引会影响增删改的效率。</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---单列索引</span></span>
<span class="line"><span>----创建单列索引</span></span>
<span class="line"><span>create index idx_ename on emp(ename);</span></span>
<span class="line"><span>----单列索引触发规则，条件必须是索引列中的原始值。</span></span>
<span class="line"><span>----单行函数，模糊查询，都会影响索引的触发。</span></span>
<span class="line"><span>select * from emp where ename=&#39;SCOTT&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---复合索引</span></span>
<span class="line"><span>----创建复合索引</span></span>
<span class="line"><span>create index idx_enamejob on emp(ename, job);</span></span>
<span class="line"><span>----复合索引中第一列为优先检索列</span></span>
<span class="line"><span>----如果要触发复合索引，必须包含有优先检索列中的原始值。</span></span>
<span class="line"><span>select * from emp where ename=&#39;SCOTT&#39; and job=&#39;xx&#39;;     ---触发复合索引</span></span>
<span class="line"><span>select * from emp where ename=&#39;SCOTT&#39; or job=&#39;xx&#39;;      ---不触发索引</span></span>
<span class="line"><span>select * from emp where ename=&#39;SCOTT&#39;;                  ---触发单列索引。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="oracle编程" tabindex="-1"><a class="header-anchor" href="#oracle编程"><span><strong>Oracle编程</strong></span></a></h2><blockquote><p>pl/sql编程语言是对sql语言的扩展，使得sql语言具有过程化编程的特性。</p></blockquote><p>pl/sql编程语言比一般的过程化编程语言，更加灵活高效。<br> pl/sql编程语言主要用来编写存储过程和存储函数等。</p><p>---声明方法<br> ---赋值操作可以使用:=也可以使用into查询语句赋值</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>declare</span></span>
<span class="line"><span>    i number(2) := 10;</span></span>
<span class="line"><span>    s varchar2(10) := &#39;小明&#39;;</span></span>
<span class="line"><span>    ena emp.ename%type;          ---引用型变量 直接将emp表中</span></span>
<span class="line"><span>    emprow emp%rowtype;          ---记录型变量 记录一行记录</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>    dbms_output.put_line(i);</span></span>
<span class="line"><span>    dbms_output.put_line(s);</span></span>
<span class="line"><span>    select ename into ena from emp where empno = 7788;</span></span>
<span class="line"><span>    dbms_output.put_line(ena);</span></span>
<span class="line"><span>    select * into emprow from emp where empno = 7788;</span></span>
<span class="line"><span>    dbms_output.put_line(emprow.ename || &#39;的工作为：&#39; || emprow.job);</span></span>
<span class="line"><span>end;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="if判断" tabindex="-1"><a class="header-anchor" href="#if判断"><span><strong>if判断</strong></span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---输入小于18的数字，输出未成年</span></span>
<span class="line"><span>---输入大于18小于40的数字，输出中年人</span></span>
<span class="line"><span>---输入大于40的数字，输出老年人</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span>  i number(3) := &amp;ii;           ---带上&amp;号就行，后面随便写</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  if i&lt;18 then</span></span>
<span class="line"><span>    dbms_output.put_line(&#39;未成年&#39;);</span></span>
<span class="line"><span>  elsif i&lt;40 then</span></span>
<span class="line"><span>    dbms_output.put_line(&#39;中年人&#39;);</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    dbms_output.put_line(&#39;老年人&#39;);</span></span>
<span class="line"><span>  end if;</span></span>
<span class="line"><span>end;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="loop循环" tabindex="-1"><a class="header-anchor" href="#loop循环"><span><strong>loop循环</strong></span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---用三种方式输出1到10是个数字</span></span>
<span class="line"><span>---while循环</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span>  i number(2) := 1;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  while i&lt;11 loop</span></span>
<span class="line"><span>     dbms_output.put_line(i);</span></span>
<span class="line"><span>     i := i+1;</span></span>
<span class="line"><span>  end loop;  </span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>---exit循环</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span>  i number(2) := 1;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  loop</span></span>
<span class="line"><span>    exit when i&gt;10;</span></span>
<span class="line"><span>    dbms_output.put_line(i);</span></span>
<span class="line"><span>    i := i+1;</span></span>
<span class="line"><span>  end loop;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>---for循环</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span></span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  for i in 1..10 loop</span></span>
<span class="line"><span>     dbms_output.put_line(i);  </span></span>
<span class="line"><span>  end loop;</span></span>
<span class="line"><span>end;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="游标" tabindex="-1"><a class="header-anchor" href="#游标"><span><strong>游标</strong></span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---游标：可以存放多个对象，多行记录。</span></span>
<span class="line"><span>---输出emp表中所有员工的姓名</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span>  cursor c1 is select * from emp;</span></span>
<span class="line"><span>  emprow emp%rowtype;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  open c1;</span></span>
<span class="line"><span>     loop</span></span>
<span class="line"><span>         fetch c1 into emprow;</span></span>
<span class="line"><span>         exit when c1%notfound;</span></span>
<span class="line"><span>         dbms_output.put_line(emprow.ename);</span></span>
<span class="line"><span>     end loop;</span></span>
<span class="line"><span>  close c1;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-----给指定部门员工涨工资</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span>  cursor c2(eno emp.deptno%type) </span></span>
<span class="line"><span>  is select empno from emp where deptno = eno;</span></span>
<span class="line"><span>  en emp.empno%type; </span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  open c2(10);</span></span>
<span class="line"><span>     loop</span></span>
<span class="line"><span>        fetch c2 into en;</span></span>
<span class="line"><span>        exit when c2%notfound;</span></span>
<span class="line"><span>        update emp set sal=sal+100 where empno=en;</span></span>
<span class="line"><span>        commit;</span></span>
<span class="line"><span>     end loop;  </span></span>
<span class="line"><span>  close c2;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>----查询10号部门员工信息</span></span>
<span class="line"><span>select * from emp where deptno = 10;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存储过程" tabindex="-1"><a class="header-anchor" href="#存储过程"><span><strong>存储过程</strong></span></a></h3><blockquote><p>存储过程就是提前已经编译好的一段pl/sql语言，放置在数据库端,可以直接被调用</p></blockquote><p>这一段pl/sql一般都是固定步骤的业务。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>----给指定员工涨100块钱</span></span>
<span class="line"><span>create or replace procedure p1(eno emp.empno%type)</span></span>
<span class="line"><span>is</span></span>
<span class="line"><span></span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>   update emp set sal=sal+100 where empno = eno;</span></span>
<span class="line"><span>   commit;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>select * from emp where empno = 7788;</span></span>
<span class="line"><span>----测试p1</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span></span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  p1(7788);</span></span>
<span class="line"><span>end;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存储函数" tabindex="-1"><a class="header-anchor" href="#存储函数"><span><strong>存储函数</strong></span></a></h3><blockquote><p>存储过程和存储函数的参数都不能带长度</p></blockquote><p>存储函数的返回值类型不能带长度</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>----通过存储函数实现计算指定员工的年薪</span></span>
<span class="line"><span>create or replace function f_yearsal(eno emp.empno%type) return number</span></span>
<span class="line"><span>is</span></span>
<span class="line"><span>  s number(10);     </span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  select sal*12+nvl(comm, 0) into s from emp where empno = eno;</span></span>
<span class="line"><span>  return s;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>----测试f_yearsal</span></span>
<span class="line"><span>----存储函数在调用的时候，返回值需要接收。</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span>  s number(10); </span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  s := f_yearsal(7788);</span></span>
<span class="line"><span>  dbms_output.put_line(s);</span></span>
<span class="line"><span>end;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="in和out类型参数" tabindex="-1"><a class="header-anchor" href="#in和out类型参数"><span><strong>in和out类型参数</strong></span></a></h3><blockquote><p>凡是涉及到into查询语句赋值或者:=赋值操作的参数，都必须使用out来修饰</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---out类型参数如何使用</span></span>
<span class="line"><span>---使用存储过程来算年薪</span></span>
<span class="line"><span>create or replace procedure p_yearsal(eno emp.empno%type, yearsal out number)</span></span>
<span class="line"><span>is</span></span>
<span class="line"><span>   s number(10);</span></span>
<span class="line"><span>   c emp.comm%type;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>   select sal*12, nvl(comm, 0) into s, c from emp where empno = eno;</span></span>
<span class="line"><span>   yearsal := s+c;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---测试p_yearsal</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span>  yearsal number(10);</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  p_yearsal(7788, yearsal);</span></span>
<span class="line"><span>  dbms_output.put_line(yearsal);</span></span>
<span class="line"><span>end;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存储过程和存储函数的区别" tabindex="-1"><a class="header-anchor" href="#存储过程和存储函数的区别"><span><strong>存储过程和存储函数的区别</strong></span></a></h3><blockquote><p>存储函数有返回值，而存储过程没有返回值</p></blockquote><p>如果存储过程想实现有返回值的业务，我们就必须使用out类型的参数<br> 即便是存储过程使用了out类型的参数，其本质也不是真的有了返回值<br> 而是在存储过程内部给out类型参数赋值，在执行完毕后，我们直接拿到输出类型参数的值<br> 我们可以使用存储函数有返回值的特性，来自定义函数<br> 而存储过程不能用来自定义函数</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---案例需求：查询出员工姓名，员工所在部门名称。</span></span>
<span class="line"><span>---案例准备工作：把scott用户下的dept表复制到当前用户下。</span></span>
<span class="line"><span>create table dept as select * from scott.dept;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>----使用传统方式来实现案例需求</span></span>
<span class="line"><span>select e.ename, d.dname</span></span>
<span class="line"><span>from emp e, dept d</span></span>
<span class="line"><span>where e.deptno=d.deptno;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>----使用存储函数来实现提供一个部门编号，输出一个部门名称。</span></span>
<span class="line"><span>create or replace function fdna(dno dept.deptno%type) return dept.dname%type</span></span>
<span class="line"><span>is</span></span>
<span class="line"><span>  dna dept.dname%type;</span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  select dname into dna from dept where deptno = dno;</span></span>
<span class="line"><span>  return dna;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>----使用fdna存储函数来实现案例需求：查询出员工姓名，员工所在部门名称。</span></span>
<span class="line"><span>select e.ename, fdna(e.deptno)</span></span>
<span class="line"><span>from emp e;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="触发器" tabindex="-1"><a class="header-anchor" href="#触发器"><span><strong>触发器</strong></span></a></h3><blockquote><p>就是制定一个规则，在我们做增删改操作的时候，只要满足该规则，自动触发，无需调用。</p></blockquote><p>语句级触发器：不包含有for each row的触发器。<br> 行级触发器：包含有for each row的就是行级触发器，<br> 而加for each row是为了使用:old或者:new对象或者一行记录。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>---语句级触发器</span></span>
<span class="line"><span>----插入一条记录，输出一个新员工入职</span></span>
<span class="line"><span>create or replace trigger t1</span></span>
<span class="line"><span>after</span></span>
<span class="line"><span>insert</span></span>
<span class="line"><span>on person</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span></span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  dbms_output.put_line(&#39;一个新员工入职&#39;);</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>---触发t1</span></span>
<span class="line"><span>insert into person values (1, &#39;小红&#39;);</span></span>
<span class="line"><span>commit;</span></span>
<span class="line"><span>select * from person;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---行级别触发器</span></span>
<span class="line"><span>---不能给员工降薪</span></span>
<span class="line"><span>---raise_application_error(-20001~-20999之间, &#39;错误提示信息&#39;);</span></span>
<span class="line"><span>create or replace trigger t2</span></span>
<span class="line"><span>before</span></span>
<span class="line"><span>update</span></span>
<span class="line"><span>on emp</span></span>
<span class="line"><span>for each row</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span></span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  if :old.sal&gt;:new.sal then</span></span>
<span class="line"><span>     raise_application_error(-20001, &#39;不能给员工降薪&#39;);</span></span>
<span class="line"><span>  end if;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>----触发t2</span></span>
<span class="line"><span>select * from emp where empno = 7788;</span></span>
<span class="line"><span>update emp set sal=sal-1 where empno = 7788;</span></span>
<span class="line"><span>commit;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>----触发器实现主键自增。【行级触发器】</span></span>
<span class="line"><span>---分析：在用户做插入操作的之前，拿到即将插入的数据，</span></span>
<span class="line"><span>------给该数据中的主键列赋值。</span></span>
<span class="line"><span>create or replace trigger auid</span></span>
<span class="line"><span>before</span></span>
<span class="line"><span>insert</span></span>
<span class="line"><span>on person</span></span>
<span class="line"><span>for each row</span></span>
<span class="line"><span>declare</span></span>
<span class="line"><span></span></span>
<span class="line"><span>begin</span></span>
<span class="line"><span>  select s_person.nextval into :new.pid from dual;</span></span>
<span class="line"><span>end;</span></span>
<span class="line"><span>--查询person表数据</span></span>
<span class="line"><span>select * from person;</span></span>
<span class="line"><span>---使用auid实现主键自增</span></span>
<span class="line"><span>insert into person (pname) values (&#39;a&#39;);</span></span>
<span class="line"><span>commit;</span></span>
<span class="line"><span>insert into person values (1, &#39;b&#39;);</span></span>
<span class="line"><span>commit;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="oracle的奇技淫巧" tabindex="-1"><a class="header-anchor" href="#oracle的奇技淫巧"><span>Oracle的奇技淫巧</span></a></h2><ul><li><strong>生成数字结果集</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>--lpad 将左边的字符串截取后填充一些特定的字符，使其达到指定的长度</span></span>
<span class="line"><span>select lpad(level,2,0) from dual</span></span>
<span class="line"><span>connect by level&lt;13  构造序列</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>获取日期的结果集</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select to_char((sysdate + rownum - 10), &#39;mm-dd&#39;) d1</span></span>
<span class="line"><span>from user_objects</span></span>
<span class="line"><span>where rownum &lt;= 10;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>日期转换</strong></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>select trunc(sysdate) from dual;                          --返回今天日期</span></span>
<span class="line"><span>select trunc(sysdate,&#39;dd&#39;) from dual;                     --返回今天日期</span></span>
<span class="line"><span>select trunc(sysdate, &#39;mm&#39;)  from dual;                   --返回当月第一天</span></span>
<span class="line"><span>select trunc(sysdate,&#39;d&#39;) from dual ;                     --返回当前星期的第一天(星期天)</span></span>
<span class="line"><span>select trunc(sysdate,&#39;yy&#39;) from dual;                     --返回当年第一天</span></span>
<span class="line"><span>select trunc(sysdate,&#39;yyyy&#39;) from dual;                   --返回当年第一天</span></span>
<span class="line"><span>select add_months(trunc(sysdate,&#39;yyyy&#39;),12)-1 from dual;  -- 返回当年最后一天</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,110)]))}const t=n(l,[["render",p],["__file","191218_Oracle 基础入门笔记.html.vue"]]),v=JSON.parse(`{"path":"/archive/blog/2019/191218_Oracle%20%E5%9F%BA%E7%A1%80%E5%85%A5%E9%97%A8%E7%AC%94%E8%AE%B0.html","title":"Oracle 基础入门笔记","lang":"zh-CN","frontmatter":{"title":"Oracle 基础入门笔记","date":"2019-12-18T08:42:46.000Z","draft":false,"category":["数据库"],"tag":["Oracle"],"description":"源自IT黑马的一份 Oracle 笔记，还挺详细的，很适合 Oracle 的入门 基本操作 表空间、用户、表 创建表空间 删除表空间 创建用户 给用户授权 oracle数据库常用角色: connect--连接角色，基本角色 resource--开发者角色 dba--超级管理员角色 创建一个person表 修改表结构 数据操作 查询表中记录 添加一条记录...","head":[["meta",{"property":"og:url","content":"https://logycoconut.github.io/archive/blog/2019/191218_Oracle%20%E5%9F%BA%E7%A1%80%E5%85%A5%E9%97%A8%E7%AC%94%E8%AE%B0.html"}],["meta",{"property":"og:site_name","content":"logycoconut's k-lab"}],["meta",{"property":"og:title","content":"Oracle 基础入门笔记"}],["meta",{"property":"og:description","content":"源自IT黑马的一份 Oracle 笔记，还挺详细的，很适合 Oracle 的入门 基本操作 表空间、用户、表 创建表空间 删除表空间 创建用户 给用户授权 oracle数据库常用角色: connect--连接角色，基本角色 resource--开发者角色 dba--超级管理员角色 创建一个person表 修改表结构 数据操作 查询表中记录 添加一条记录..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-11T14:19:39.000Z"}],["meta",{"property":"article:tag","content":"Oracle"}],["meta",{"property":"article:published_time","content":"2019-12-18T08:42:46.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-11T14:19:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Oracle 基础入门笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-12-18T08:42:46.000Z\\",\\"dateModified\\":\\"2025-02-11T14:19:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"logycoconut\\",\\"url\\":\\"https://logycoconut.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"基本操作","slug":"基本操作","link":"#基本操作","children":[{"level":3,"title":"表空间、用户、表","slug":"表空间、用户、表","link":"#表空间、用户、表","children":[]},{"level":3,"title":"数据操作","slug":"数据操作","link":"#数据操作","children":[]},{"level":3,"title":"序列","slug":"序列","link":"#序列","children":[]},{"level":3,"title":"单行函数","slug":"单行函数","link":"#单行函数","children":[]},{"level":3,"title":"条件表达式","slug":"条件表达式","link":"#条件表达式","children":[]},{"level":3,"title":"聚合函数","slug":"聚合函数","link":"#聚合函数","children":[]},{"level":3,"title":"分组查询","slug":"分组查询","link":"#分组查询","children":[]},{"level":3,"title":"多表查询","slug":"多表查询","link":"#多表查询","children":[]},{"level":3,"title":"Oracle中的分页","slug":"oracle中的分页","link":"#oracle中的分页","children":[]},{"level":3,"title":"视图、索引","slug":"视图、索引","link":"#视图、索引","children":[]}]},{"level":2,"title":"Oracle编程","slug":"oracle编程","link":"#oracle编程","children":[{"level":3,"title":"if判断","slug":"if判断","link":"#if判断","children":[]},{"level":3,"title":"loop循环","slug":"loop循环","link":"#loop循环","children":[]},{"level":3,"title":"游标","slug":"游标","link":"#游标","children":[]},{"level":3,"title":"存储过程","slug":"存储过程","link":"#存储过程","children":[]},{"level":3,"title":"存储函数","slug":"存储函数","link":"#存储函数","children":[]},{"level":3,"title":"in和out类型参数","slug":"in和out类型参数","link":"#in和out类型参数","children":[]},{"level":3,"title":"存储过程和存储函数的区别","slug":"存储过程和存储函数的区别","link":"#存储过程和存储函数的区别","children":[]},{"level":3,"title":"触发器","slug":"触发器","link":"#触发器","children":[]}]},{"level":2,"title":"Oracle的奇技淫巧","slug":"oracle的奇技淫巧","link":"#oracle的奇技淫巧","children":[]}],"git":{"createdTime":1667915485000,"updatedTime":1739283579000,"contributors":[{"name":"logycoconut","username":"logycoconut","email":"1425795337@qq.com","commits":1,"url":"https://github.com/logycoconut"},{"name":"logycoconut","username":"logycoconut","email":"logycoconut@foxmail.com","commits":4,"url":"https://github.com/logycoconut"}]},"readingTime":{"minutes":12.65,"words":3794},"filePathRelative":"archive/blog/2019/191218_Oracle 基础入门笔记.md","localizedDate":"2019年12月18日","autoDesc":true}`);export{t as comp,v as data};
