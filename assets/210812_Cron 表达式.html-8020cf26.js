import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as s,c as l,a as e,b as d,d as o,f as r,e as a}from"./app-74efb890.js";const c={},u=r(`<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><p>Cron表达式是一个字符串，字符串以5或6个空格隔开，分为6或7个域，每一个域代表一个含义，Cron有如下两种语法格式：</p><p><em><code>Seconds Minutes Hours DayofMonth Month DayofWeek Year</code></em></p><p><em><code>Seconds Minutes Hours DayofMonth Month DayofWeek</code></em></p><p><strong>各个域的定义</strong></p><table><thead><tr><th>域</th><th>值以及范围</th><th>通配符</th><th>是否必填</th></tr></thead><tbody><tr><td>秒</td><td>0 - 59</td><td>, - * /</td><td>Yes</td></tr><tr><td>分</td><td>0 - 59</td><td>, - * /</td><td>Yes</td></tr><tr><td>时</td><td>0 - 23</td><td>, - * /</td><td>Yes</td></tr><tr><td>日</td><td>0 -31</td><td>, - * / ? L W C</td><td>Yes</td></tr><tr><td>月</td><td>1- 12 or JAN - DEC</td><td>, - * /</td><td>Yes</td></tr><tr><td>周</td><td>1 - 7 or SUN - SAT</td><td>, - * / ? L C #</td><td>Yes</td></tr><tr><td>年</td><td>1970 - 2099</td><td>, - * / No</td><td>No</td></tr></tbody></table><h2 id="通配符含义" tabindex="-1"><a class="header-anchor" href="#通配符含义" aria-hidden="true">#</a> 通配符含义</h2><ul><li><code>,</code> 指定两个以上的时间点。如果我们在 “分” 这个域中定义为 <code>8,12,35</code> ，则表示分别在第8分，第12分，第35分执行该定时任务。</li><li><code>-</code> 指定在某个域的连续范围。如果我们在 “时” 这个域中定义 <code>1-6</code>，则表示在1到6点之间每小时都触发一次，用 <code>,</code> 表示 <code>1,2,3,4,5,6</code></li><li><code>*</code> 表示所有值，可解读为 “每”。 如果在“日”这个域中设置 <code>*</code>,表示每一天都会触发。</li><li><code>/</code> 在某个域上周期性触发，该符号将其所在域中的表达式分为两个部分，其中第一部分是起始值，除了秒以外都会降低一个单位，比如 在 “秒” 上定义 <code>5/10</code> 表示从 第 5 秒开始 每 10 秒执行一次，而在 “分” 上则表示从 第 5 秒开始 每 10 分钟执行一次。</li><li><code>?</code> 表示不指定值。使用的场景为不需要关心当前设置这个字段的值。例如:要在每月的8号触发一个操作，但不关心是周几，我们可以这么设置 <code>0 0 0 8 * ?</code></li><li><code>L</code> 表示英文中的<strong>LAST</strong> 的意思，只能在 “日”和“周”中使用。在“日”中设置，表示当月的最后一天(依据当前月份，如果是二月还会依据是否是润年), 在“周”上表示周六，相当于”7”或”SAT”。如果在”L”前加上数字，则表示该数据的最后一个。例如在“周”上设置”7L”这样的格式,则表示“本月最后一个周六”</li><li><code>W</code> 表示离指定日期的最近那个工作日(周一至周五)触发，只能在 “日” 中使用且只能用在具体的数字之后。若在“日”上置”15W”，表示离每月15号最近的那个工作日触发。假如15号正好是周六，则找最近的周五(14号)触发, 如果15号是周未，则找最近的下周一(16号)触发.如果15号正好在工作日(周一至周五)，则就在该天触发。如果是 “1W” 就只能往本月的下一个最近的工作日推不能跨月往上一个月推。</li><li><code>#</code> 表示每月的第几个周几，只能作用于 “周” 上。例如 ”2#3” 表示在每月的第三个周二</li></ul><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>- 每隔1分钟执行一次：0 */1 * * * ?
每天22点执行一次：0 0 22 * * ?
每月1号凌晨1点执行一次：0 0 1 1 * ?
每月最后一天23点执行一次：0 0 23 L * ?
每周周六凌晨3点实行一次：0 0 3 ? * L
在24分、30分执行一次：0 24,30 * * * ?

*/5 * * * * ? 每隔5秒执行一次
0 */1 * * * ? 每隔1分钟执行一次
0 0 5-15 * * ? 每天5-15点整点触发
0 0/3 * * * ? 每三分钟触发一次
0 0-5 14 * * ? 在每天下午2点到下午2:05期间的每1分钟触发 
0 0/5 14 * * ? 在每天下午2点到下午2:55期间的每5分钟触发
0 0/5 14,18 * * ? 在每天下午2点到2:55期间和下午6点到6:55期间的每5分钟触发
0 0/30 9-17 * * ? 朝九晚五工作时间内每半小时
0 0 10,14,16 * * ? 每天上午10点，下午2点，4点 

0 0 12 ? * WED 表示每个星期三中午12点
0 0 17 ? * TUES,THUR,SAT 每周二、四、六下午五点
0 10,44 14 ? 3 WED 每年三月的星期三的下午2:10和2:44触发 
0 15 10 ? * MON-FRI 周一至周五的上午10:15触发
0 0 23 L * ? 每月最后一天23点执行一次
0 15 10 L * ? 每月最后一日的上午10:15触发 
0 15 10 ? * 6L 每月的最后一个星期五上午10:15触发 
0 15 10 * * ? 2005 2005年的每天上午10:15触发 
0 15 10 ? * 6L 2002-2005 2002年至2005年的每月的最后一个星期五上午10:15触发 
0 15 10 ? * 6#3 每月的第三个星期五上午10:15触发

&quot;30 * * * * ?&quot; 每半分钟触发任务
&quot;30 10 * * * ?&quot; 每小时的10分30秒触发任务
&quot;30 10 1 * * ?&quot; 每天1点10分30秒触发任务
&quot;30 10 1 20 * ?&quot; 每月20号1点10分30秒触发任务
&quot;30 10 1 20 10 ? *&quot; 每年10月20号1点10分30秒触发任务
&quot;30 10 1 20 10 ? 2011&quot; 2011年10月20号1点10分30秒触发任务
&quot;30 10 1 ? 10 * 2011&quot; 2011年10月每天1点10分30秒触发任务
&quot;30 10 1 ? 10 SUN 2011&quot; 2011年10月每周日1点10分30秒触发任务
&quot;15,30,45 * * * * ?&quot; 每15秒，30秒，45秒时触发任务
&quot;15-45 * * * * ?&quot; 15到45秒内，每秒都触发任务
&quot;15/5 * * * * ?&quot; 每分钟的每15秒开始触发，每隔5秒触发一次
&quot;15-30/5 * * * * ?&quot; 每分钟的15秒到30秒之间开始触发，每隔5秒触发一次
&quot;0 0/3 * * * ?&quot; 每小时的第0分0秒开始，每三分钟触发一次
&quot;0 15 10 ? * MON-FRI&quot; 星期一到星期五的10点15分0秒触发任务
&quot;0 15 10 L * ?&quot; 每个月最后一天的10点15分0秒触发任务
&quot;0 15 10 LW * ?&quot; 每个月最后一个工作日的10点15分0秒触发任务
&quot;0 15 10 ? * 5L&quot; 每个月最后一个星期四的10点15分0秒触发任务
&quot;0 15 10 ? * 5#3&quot; 每个月第三周的星期四的10点15分0秒触发任务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可视化工具" tabindex="-1"><a class="header-anchor" href="#可视化工具" aria-hidden="true">#</a> <strong>可视化工具</strong></h2>`,11),v=e("li",null,[e("p",null,"IDEA-Cron Description 插件")],-1),m={href:"https://www.pppet.net/",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,[d("​​"),a(" +++++++++ 下面是引用式链接 +++++++++ ")],-1);function h(q,_){const n=t("ExternalLinkIcon");return s(),l("div",null,[u,e("ul",null,[v,e("li",null,[e("p",null,[e("a",m,[d("Cron 可视化工具"),o(n)])])])]),b])}const L=i(c,[["render",h],["__file","210812_Cron 表达式.html.vue"]]);export{L as default};
