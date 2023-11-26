import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,f as s}from"./app-c91d02ba.js";const d={},l=s(`<blockquote><p>源自IT黑马的一份 Oracle 笔记，还挺详细的，很适合 Oracle 的入门</p></blockquote><h2 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h2><h3 id="表空间、用户、表" tabindex="-1"><a class="header-anchor" href="#表空间、用户、表" aria-hidden="true">#</a> <strong>表空间、用户、表</strong></h3><ul><li><strong>创建表空间</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create tablespace oraclets
datafile &#39;c:\\itheima.dbf&#39;
size 100m
autoextend on
next 10m;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>删除表空间</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>drop tablespace oraclets;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>创建用户</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create user oracleuser
identified by oraclepassword
default tablespace oraclets;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>给用户授权</strong></li></ul><p><em><strong>oracle数据库常用角色</strong>:<br> connect--连接角色，基本角色<br> resource--开发者角色<br> dba--超级管理员角色</em></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--给用户授予dba角色
grant dba to oracleuser;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>创建一个person表</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create table person(
       pid number(20),
       pname varchar2(10)
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>修改表结构</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---添加一列
alter table person add (gender number(1));
---修改列类型
alter table person modify gender char(1);
---修改列名称
alter table person rename column gender to sex;
---删除一列
alter table person drop column sex;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据操作" tabindex="-1"><a class="header-anchor" href="#数据操作" aria-hidden="true">#</a> <strong>数据操作</strong></h3><ul><li><strong>查询表中记录</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select * from person;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>添加一条记录</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>insert into person (pid, pname) values (1, &#39;小明&#39;);
commit;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>更新一条记录</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>update person set pname = &#39;小红&#39; where pid = 1;
commit;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>删除表、记录</strong>*</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--删除表中全部记录
delete from person;

--删除表结构
drop table person;

--先删除表，再次创建表。效果等同于删除表中全部记录
--在数据量大的情况下，尤其在表中带有索引的情况下，该操作效率高
--索引可以提供查询效率，但是会影响增删改效率
truncate table person;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>解锁Oracle专有的scott用户</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--解锁scott用户，密码默认是tiger
alter user scott account unlock;
--解锁scott用户的密码【此句也可以用来重置密码】
alter user scott identified by tiger;
--切换到scott用户
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="序列" tabindex="-1"><a class="header-anchor" href="#序列" aria-hidden="true">#</a> <strong>序列</strong></h3><blockquote><p>序列不真的属于任何一张表，但是可以逻辑和表做绑定</p></blockquote><p>序列默认从1开始，依次递增，主要用来给主键赋值使用<br> dual是虚表，只是为了补全语法，没有任何意义</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create sequence s_person;
select s_person.nextval from dual;
----添加一条记录
insert into person (pid, pname) values (s_person.nextval, &#39;小明&#39;);
commit;
select * from person;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="单行函数" tabindex="-1"><a class="header-anchor" href="#单行函数" aria-hidden="true">#</a> <strong>单行函数</strong></h3><blockquote><p>作用于一行，返回一个值</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---字符函数
select upper(&#39;yes&#39;) from dual;    --YES
select lower(&#39;YES&#39;) from dual;    --yes

---数值函数
select round(56.16, -2) from dual;   ---四舍五入，后面的参数表示保留的位数
select trunc(56.16, -1) from dual;   ---直接截取，不在看后面数字
select mod(10, 3) from dual;         ---求余

---日期函数
----查询出emp表中所有员工入职距离现在还有几天
select sysdate-e.hiredate from emp e;
----算出明天此刻
select sysdate+1 from dual;
----查询出emp表中所有员工入职距离现在几月
select months_between(sysdate,e.hiredate) from emp e;
----查询出emp表中所有员工入职距离现在几年
select months_between(sysdate,e.hiredate)/12 from emp e;
----查询出emp表中所有员工入职距离现在几周
select round((sysdate-e.hiredate)/7) from emp e;

---转换函数
----日期转字符串
select to_char(sysdate, &#39;fm yyyy-mm-dd hh24:mi:ss&#39;) from dual;
----字符串转日期
select to_date(&#39;2018-6-7 16:39:50&#39;, &#39;fm yyyy-mm-dd hh24:mi:ss&#39;) from dual;

---通用函数
----算出emp表中所有员工的年薪
----奖金里面有null值，如果null值和任意数字做算数运算，结果都是null
select e.sal*12+nvl(e.comm, 0) from emp e;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="条件表达式" tabindex="-1"><a class="header-anchor" href="#条件表达式" aria-hidden="true">#</a> <strong>条件表达式</strong></h3><blockquote><p>条件表达式的通用写法，Mysql和Oracle通用</p></blockquote><p>Oracle中除了起别名，都用单引号</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---给emp表中员工起中文字
select e.ename, 
       case e.ename
         when &#39;SMITH&#39; then &#39;曹贼&#39;
           when &#39;ALLEN&#39; then &#39;大耳贼&#39;
             when &#39;WARD&#39; then &#39;诸葛小儿&#39;
               --else &#39;无名&#39;
                 end
from emp e;

---判断emp表中员工工资，如果高于3000显示高收入，如果高于1500低于3000显示中等收入
-----其余显示低收入
select e.sal, 
       case 
         when e.sal&gt;3000 then &#39;高收入&#39;
           when e.sal&gt;1500 then &#39;中等收入&#39;
               else &#39;低收入&#39;
                 end
from emp e;

----Oracle专用条件表达式
select e.ename, 
        decode(e.ename,
          &#39;SMITH&#39;,  &#39;曹贼&#39;,
            &#39;ALLEN&#39;,  &#39;大耳贼&#39;,
              &#39;WARD&#39;,  &#39;诸葛小儿&#39;,
                &#39;无名&#39;) &quot;中文名&quot;             
from emp e;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="聚合函数" tabindex="-1"><a class="header-anchor" href="#聚合函数" aria-hidden="true">#</a> <strong>聚合函数</strong></h3><blockquote><p>作用于多行，返回一个值</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select count(1) from emp;    ---查询总数量，count(1)就是count主键
select sum(sal) from emp;    ---工资总和
select max(sal) from emp;    ---最大工资
select min(sal) from emp;    ---最低工资
select avg(sal) from emp;    ---平均工资
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分组查询" tabindex="-1"><a class="header-anchor" href="#分组查询" aria-hidden="true">#</a> <strong>分组查询</strong></h3><blockquote><p>分组查询中，出现在group by后面的原始列，才能出现select后面</p></blockquote><p>没有出现在group by后面的列，想在select后面，必须加上聚合函数<br> 聚合函数有一个特性，可以把多行记录变成一个值<br> where是过滤分组前的数据，having是过滤分组后的数据<br> where不许在group by之前，having是在group by之后</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---查询出每个部门的平均工资
select e.deptno, avg(e.sal)
from emp e
group by e.deptno;

---查询出平均工资高于两千的部门信息
select e.deptno, avg(e.sal) asal
from emp e
group by e.deptno
having avg(e.sal)&gt;2000;

---查询出每个部门工资高于800的员工的平均工资
select e.deptno, avg(e.sal) asal
from emp e
where e.sal&gt;800
group by e.deptno;

---查询出每个部门工资高于800的员工的平均工资
---再查询出在平均工资高于2000的部门
select e.deptno, avg(e.sal) asal
from emp e
where e.sal&gt;800
group by e.deptno
having avg(e.sal)&gt;2000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多表查询" tabindex="-1"><a class="header-anchor" href="#多表查询" aria-hidden="true">#</a> <strong>多表查询</strong></h3><ul><li><strong>笛卡尔积</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select *
from emp e, dept d;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>等值连接</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select *
from emp e, dept d
where e.deptno=d.deptno;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>内连接</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select *
from emp e inner join dept d
on e.deptno = d.deptno;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>外连接</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---查询所有部门，以及部门下的员工信息

----右外连接
select *
from emp e right join dept d
on e.deptno=d.deptno;

---左外连接
select *
from emp e left join dept d
on e.deptno=d.deptno;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>Oracle专用外连接</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---左外连接
select *
from emp e, dept d
where e.deptno(+) = d.deptno;

---右外连接
select *
from emp e, dept d
where e.deptno = d.deptno(+);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>自连接</strong></li></ul><blockquote><p>自连接其实就是站在不同的角度把一张表看成多张表</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select * from emp;

---查询出员工姓名，员工领导姓名
select e1.ename, e2.ename
from emp e1, emp e2
where e1.mgr = e2.empno;

------查询出员工姓名，员工部门名称，员工领导姓名，员工领导部门名称
select e1.ename, d1.dname, e2.ename, d2.dname
from emp e1, emp e2, dept d1, dept d2
where e1.mgr = e2.empno
and e1.deptno=d1.deptno
and e2.deptno=d2.deptno;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>子查询</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---子查询返回一个值
----查询出工资和scott一样的员工信息
select * from emp where sal in
(select sal from emp where ename = &#39;SCOTT&#39;)

---子查询返回一个集合
----查询出工资和10号部门任一员工一样的员工信息
select * from emp where sal in
(select sal from emp where deptno = 10);

---子查询返回一张表
----查询出每个部门最低工资，和最低工资员工姓名，和该员工所在部门名称
----1.先查询每个部门最低工资
select deptno, min(sal) msal
from emp 
group by deptno;
----2.三表联查，得到最终结果
select t.deptno, t.msal, e.ename, d.dname
from (select deptno, min(sal) msal
      from emp 
      group by deptno) t, emp e, dept d
where t.deptno = e.deptno
and t.msal = e.sal
and e.deptno = d.deptno;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="oracle中的分页" tabindex="-1"><a class="header-anchor" href="#oracle中的分页" aria-hidden="true">#</a> <strong>Oracle中的分页</strong></h3><blockquote><p>rownum( 行号 )</p></blockquote><p>当我们做select操作的时候，每查询出一行记录，就会在该行上加上一个行号，<br> 行号从1开始，依次递增，不能跳着走<br> rownum不能写上大于一个正数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>----排序操作会影响rownum的顺序
select rownum, e.* from emp e order by e.sal desc

----如果涉及到排序，但是还要使用rownum的话，我们再次嵌套查询
select rownum, t.* from(
select rownum, e.* from emp e order by e.sal desc) t;


----emp表工资倒叙排列后，每页五条记录，查询第二页
select * from(
    select rownum rn, tt.* from(
          select * from emp order by sal desc
    ) tt where rownum&lt;11
) where rn&gt;5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="视图、索引" tabindex="-1"><a class="header-anchor" href="#视图、索引" aria-hidden="true">#</a> <strong>视图、索引</strong></h3><ul><li><strong>视图</strong></li></ul><blockquote><p>视图就是提供一个查询的窗口，所有数据来自于原表。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---查询语句创建表
create table emp as select * from scott.emp;
select * from emp;
---创建视图【必须有dba权限】
create view v_emp as select ename, job from emp;
---查询视图
select * from v_emp;
---修改视图[不推荐]
update v_emp set job=&#39;CLERK&#39; where ename=&#39;ALLEN&#39;;
commit;
---创建只读视图
create view v_emp1 as select ename, job from emp with read only;
---视图的作用
---第一：视图可以屏蔽掉一些敏感字段。
---第二：保证总部和分部数据及时统一。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>索引</strong></li></ul><blockquote><p>索引就是在表的列上构建一个二叉树,达到大幅度提高查询效率的目的，但是索引会影响增删改的效率。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---单列索引
----创建单列索引
create index idx_ename on emp(ename);
----单列索引触发规则，条件必须是索引列中的原始值。
----单行函数，模糊查询，都会影响索引的触发。
select * from emp where ename=&#39;SCOTT&#39;

---复合索引
----创建复合索引
create index idx_enamejob on emp(ename, job);
----复合索引中第一列为优先检索列
----如果要触发复合索引，必须包含有优先检索列中的原始值。
select * from emp where ename=&#39;SCOTT&#39; and job=&#39;xx&#39;;     ---触发复合索引
select * from emp where ename=&#39;SCOTT&#39; or job=&#39;xx&#39;;      ---不触发索引
select * from emp where ename=&#39;SCOTT&#39;;                  ---触发单列索引。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="oracle编程" tabindex="-1"><a class="header-anchor" href="#oracle编程" aria-hidden="true">#</a> <strong>Oracle编程</strong></h2><blockquote><p>pl/sql编程语言是对sql语言的扩展，使得sql语言具有过程化编程的特性。</p></blockquote><p>pl/sql编程语言比一般的过程化编程语言，更加灵活高效。<br> pl/sql编程语言主要用来编写存储过程和存储函数等。</p><p>---声明方法<br> ---赋值操作可以使用:=也可以使用into查询语句赋值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>declare
    i number(2) := 10;
    s varchar2(10) := &#39;小明&#39;;
    ena emp.ename%type;          ---引用型变量 直接将emp表中
    emprow emp%rowtype;          ---记录型变量 记录一行记录
begin
    dbms_output.put_line(i);
    dbms_output.put_line(s);
    select ename into ena from emp where empno = 7788;
    dbms_output.put_line(ena);
    select * into emprow from emp where empno = 7788;
    dbms_output.put_line(emprow.ename || &#39;的工作为：&#39; || emprow.job);
end;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="if判断" tabindex="-1"><a class="header-anchor" href="#if判断" aria-hidden="true">#</a> <strong>if判断</strong></h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---输入小于18的数字，输出未成年
---输入大于18小于40的数字，输出中年人
---输入大于40的数字，输出老年人
declare
  i number(3) := &amp;ii;           ---带上&amp;号就行，后面随便写
begin
  if i&lt;18 then
    dbms_output.put_line(&#39;未成年&#39;);
  elsif i&lt;40 then
    dbms_output.put_line(&#39;中年人&#39;);
  else
    dbms_output.put_line(&#39;老年人&#39;);
  end if;
end;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="loop循环" tabindex="-1"><a class="header-anchor" href="#loop循环" aria-hidden="true">#</a> <strong>loop循环</strong></h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---用三种方式输出1到10是个数字
---while循环
declare
  i number(2) := 1;
begin
  while i&lt;11 loop
     dbms_output.put_line(i);
     i := i+1;
  end loop;  
end;
---exit循环
declare
  i number(2) := 1;
begin
  loop
    exit when i&gt;10;
    dbms_output.put_line(i);
    i := i+1;
  end loop;
end;
---for循环
declare

begin
  for i in 1..10 loop
     dbms_output.put_line(i);  
  end loop;
end;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="游标" tabindex="-1"><a class="header-anchor" href="#游标" aria-hidden="true">#</a> <strong>游标</strong></h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---游标：可以存放多个对象，多行记录。
---输出emp表中所有员工的姓名
declare
  cursor c1 is select * from emp;
  emprow emp%rowtype;
begin
  open c1;
     loop
         fetch c1 into emprow;
         exit when c1%notfound;
         dbms_output.put_line(emprow.ename);
     end loop;
  close c1;
end;

-----给指定部门员工涨工资
declare
  cursor c2(eno emp.deptno%type) 
  is select empno from emp where deptno = eno;
  en emp.empno%type; 
begin
  open c2(10);
     loop
        fetch c2 into en;
        exit when c2%notfound;
        update emp set sal=sal+100 where empno=en;
        commit;
     end loop;  
  close c2;
end;
----查询10号部门员工信息
select * from emp where deptno = 10;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存储过程" tabindex="-1"><a class="header-anchor" href="#存储过程" aria-hidden="true">#</a> <strong>存储过程</strong></h3><blockquote><p>存储过程就是提前已经编译好的一段pl/sql语言，放置在数据库端,可以直接被调用</p></blockquote><p>这一段pl/sql一般都是固定步骤的业务。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>----给指定员工涨100块钱
create or replace procedure p1(eno emp.empno%type)
is

begin
   update emp set sal=sal+100 where empno = eno;
   commit;
end;

select * from emp where empno = 7788;
----测试p1
declare

begin
  p1(7788);
end;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存储函数" tabindex="-1"><a class="header-anchor" href="#存储函数" aria-hidden="true">#</a> <strong>存储函数</strong></h3><blockquote><p>存储过程和存储函数的参数都不能带长度</p></blockquote><p>存储函数的返回值类型不能带长度</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>----通过存储函数实现计算指定员工的年薪
create or replace function f_yearsal(eno emp.empno%type) return number
is
  s number(10);     
begin
  select sal*12+nvl(comm, 0) into s from emp where empno = eno;
  return s;
end;

----测试f_yearsal
----存储函数在调用的时候，返回值需要接收。
declare
  s number(10); 
begin
  s := f_yearsal(7788);
  dbms_output.put_line(s);
end;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="in和out类型参数" tabindex="-1"><a class="header-anchor" href="#in和out类型参数" aria-hidden="true">#</a> <strong>in和out类型参数</strong></h3><blockquote><p>凡是涉及到into查询语句赋值或者:=赋值操作的参数，都必须使用out来修饰</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---out类型参数如何使用
---使用存储过程来算年薪
create or replace procedure p_yearsal(eno emp.empno%type, yearsal out number)
is
   s number(10);
   c emp.comm%type;
begin
   select sal*12, nvl(comm, 0) into s, c from emp where empno = eno;
   yearsal := s+c;
end;

---测试p_yearsal
declare
  yearsal number(10);
begin
  p_yearsal(7788, yearsal);
  dbms_output.put_line(yearsal);
end;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="存储过程和存储函数的区别" tabindex="-1"><a class="header-anchor" href="#存储过程和存储函数的区别" aria-hidden="true">#</a> <strong>存储过程和存储函数的区别</strong></h3><blockquote><p>存储函数有返回值，而存储过程没有返回值</p></blockquote><p>如果存储过程想实现有返回值的业务，我们就必须使用out类型的参数<br> 即便是存储过程使用了out类型的参数，其本质也不是真的有了返回值<br> 而是在存储过程内部给out类型参数赋值，在执行完毕后，我们直接拿到输出类型参数的值<br> 我们可以使用存储函数有返回值的特性，来自定义函数<br> 而存储过程不能用来自定义函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---案例需求：查询出员工姓名，员工所在部门名称。
---案例准备工作：把scott用户下的dept表复制到当前用户下。
create table dept as select * from scott.dept;

----使用传统方式来实现案例需求
select e.ename, d.dname
from emp e, dept d
where e.deptno=d.deptno;

----使用存储函数来实现提供一个部门编号，输出一个部门名称。
create or replace function fdna(dno dept.deptno%type) return dept.dname%type
is
  dna dept.dname%type;
begin
  select dname into dna from dept where deptno = dno;
  return dna;
end;
----使用fdna存储函数来实现案例需求：查询出员工姓名，员工所在部门名称。
select e.ename, fdna(e.deptno)
from emp e;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="触发器" tabindex="-1"><a class="header-anchor" href="#触发器" aria-hidden="true">#</a> <strong>触发器</strong></h3><blockquote><p>就是制定一个规则，在我们做增删改操作的时候，只要满足该规则，自动触发，无需调用。</p></blockquote><p>语句级触发器：不包含有for each row的触发器。<br> 行级触发器：包含有for each row的就是行级触发器，<br> 而加for each row是为了使用:old或者:new对象或者一行记录。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---语句级触发器
----插入一条记录，输出一个新员工入职
create or replace trigger t1
after
insert
on person
declare

begin
  dbms_output.put_line(&#39;一个新员工入职&#39;);
end;
---触发t1
insert into person values (1, &#39;小红&#39;);
commit;
select * from person;

---行级别触发器
---不能给员工降薪
---raise_application_error(-20001~-20999之间, &#39;错误提示信息&#39;);
create or replace trigger t2
before
update
on emp
for each row
declare

begin
  if :old.sal&gt;:new.sal then
     raise_application_error(-20001, &#39;不能给员工降薪&#39;);
  end if;
end;
----触发t2
select * from emp where empno = 7788;
update emp set sal=sal-1 where empno = 7788;
commit;

----触发器实现主键自增。【行级触发器】
---分析：在用户做插入操作的之前，拿到即将插入的数据，
------给该数据中的主键列赋值。
create or replace trigger auid
before
insert
on person
for each row
declare

begin
  select s_person.nextval into :new.pid from dual;
end;
--查询person表数据
select * from person;
---使用auid实现主键自增
insert into person (pname) values (&#39;a&#39;);
commit;
insert into person values (1, &#39;b&#39;);
commit;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="oracle的奇技淫巧" tabindex="-1"><a class="header-anchor" href="#oracle的奇技淫巧" aria-hidden="true">#</a> Oracle的奇技淫巧</h2><ul><li><strong>生成数字结果集</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--lpad 将左边的字符串截取后填充一些特定的字符，使其达到指定的长度
select lpad(level,2,0) from dual
connect by level&lt;13  构造序列
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>获取日期的结果集</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select to_char((sysdate + rownum - 10), &#39;mm-dd&#39;) d1
from user_objects
where rownum &lt;= 10;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>日期转换</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select trunc(sysdate) from dual;                          --返回今天日期
select trunc(sysdate,&#39;dd&#39;) from dual;                     --返回今天日期
select trunc(sysdate, &#39;mm&#39;)  from dual;                   --返回当月第一天
select trunc(sysdate,&#39;d&#39;) from dual ;                     --返回当前星期的第一天(星期天)
select trunc(sysdate,&#39;yy&#39;) from dual;                     --返回当年第一天
select trunc(sysdate,&#39;yyyy&#39;) from dual;                   --返回当年第一天
select add_months(trunc(sysdate,&#39;yyyy&#39;),12)-1 from dual;  -- 返回当年最后一天
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,110),a=[l];function r(v,c){return n(),i("div",null,a)}const u=e(d,[["render",r],["__file","191218_Oracle 基础入门笔记.html.vue"]]);export{u as default};
