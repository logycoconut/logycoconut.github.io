import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as t,c as l,a,b as r,d,f as e}from"./app-2b520869.js";const c={},h=e(`<h2 id="arraylist-和-linkedlist-的区别" tabindex="-1"><a class="header-anchor" href="#arraylist-和-linkedlist-的区别" aria-hidden="true">#</a> ArrayList 和 LinkedList 的区别</h2><ul><li><p><strong>是否保证线程安全</strong>：二者都是不同步的，都不保证线程安全</p></li><li><p><strong>底层数据结构</strong>：ArrayList 底层是 Object[]数组；LinkedList 底层用的是双向链表</p></li><li><p><strong>插入和删除是否受元素位置的影响</strong>：</p><ul><li>ArrayList 采用数组存储，所以插入和删除元素受元素位置的影响</li></ul><p>比如：执行 add(E e)方法时，会默认将指定的元素追加到此列表的末尾，这种时间复杂度就是 O(1)，但是如果要在指定位置增加元素的话，时间复杂度就是 O(n-i)，因为其余位置的元素都需要向后移动一位</p><ul><li>LinkedList 采用链表存储，所以对于 add(E e)方法来说，复杂度也近似 O(1)，如果是要在指定位置插入元素的话，时间复杂度就近似 O(n)，因为需要先移动到指定位置</li></ul></li><li><p><strong>是否支持快速随机访问</strong>：ArrayList 支持。快速随机访问就是通过元素的序号快速获取元素</p></li><li><p><strong>内存空间占用</strong>：ArrayList 的空间浪费主要体现在 list 的结尾会预留一定的容量空间，而 LinkedList 的空间话费则体现在它的每一个元素都需要消耗比 ArrayList 更多的空间（因为要存放直接后继、直接前驱以及数据）</p></li></ul><h3 id="randomaccess接口" tabindex="-1"><a class="header-anchor" href="#randomaccess接口" aria-hidden="true">#</a> RandomAccess接口</h3><p>ArrayList 实现了此接口，RandomAccess 接口只是一个标识，标识这个类具有随机访问的功能</p><p>在 <code>binarySearch()</code> 方法中，他会判断传入的 list 是否实现 RandomAccess，如果是则调用 <code>indexedBinarySearch()</code> 方法，否则调用 <code>iteratorBinarySearch()</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static &lt;T&gt;
int binarySearch(List&lt;? extends Comparable&lt;? super T&gt;&gt; list, T key) {
    if (list instanceof RandomAccess || list.size()&lt;BINARYSEARCH_THRESHOLD)
        return Collections.indexedBinarySearch(list, key);
    else
        return Collections.iteratorBinarySearch(list, key);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="arraylist的扩容机制" tabindex="-1"><a class="header-anchor" href="#arraylist的扩容机制" aria-hidden="true">#</a> ArrayList的扩容机制</h2><h3 id="arraylist的构造函数" tabindex="-1"><a class="header-anchor" href="#arraylist的构造函数" aria-hidden="true">#</a> ArrayList的构造函数</h3><p>默认无参构造函数实际上初始化了一个空数组，当真正对数组进行添加元素操作时，才真正分配容量</p><p>即向数组中添加第一个元素时，数组扩容为 10</p><h3 id="代码解析-java8" tabindex="-1"><a class="header-anchor" href="#代码解析-java8" aria-hidden="true">#</a> 代码解析（Java8）</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 添加元素
public boolean add(E e) {
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}

private void ensureCapacityInternal(int minCapacity) {
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}

// 获取最小扩容量
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}

// 判断是否需要扩容
private void ensureExplicitCapacity(int minCapacity) {
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length &gt; 0)
        grow(minCapacity);
}

// 核心扩容方法
private void grow(int minCapacity) {
    // 记录旧容量
    int oldCapacity = elementData.length;
    // 计算新容量，结果等于旧容量的1.5倍
    int newCapacity = oldCapacity + (oldCapacity &gt;&gt; 1);
    if (newCapacity - minCapacity &lt; 0)
        newCapacity = minCapacity;
    if (newCapacity - MAX_ARRAY_SIZE &gt; 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="system-arraycpoy-和-arrays-copyof-方法" tabindex="-1"><a class="header-anchor" href="#system-arraycpoy-和-arrays-copyof-方法" aria-hidden="true">#</a> System.arraycpoy()和 Arrays.copyOf()方法</h3><ul><li>Arrays.copyOf：主要用于给原数组扩容，内部会新建一个数组，并返回该数组</li><li>System.arraycopy：将原数组拷贝到你自己定义的数组里或原数组，而且可以选择拷贝的起点和长度以及放入新数组中的位置</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
- 复制数组
- @param src 源数组
- @param srcPos 源数组中的起始位置
- @param dest 目标数组
- @param destPos 目标数组中的起始位置
- @param length 要复制的数组元素的数量
*/
public static native void arraycopy(Object src,  int  srcPos, Object dest, int destPos, int length);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ensurecapacity-和-ensurecapacityinternal" tabindex="-1"><a class="header-anchor" href="#ensurecapacity-和-ensurecapacityinternal" aria-hidden="true">#</a> ensureCapacity 和 ensureCapacityInternal</h3><p>顾名思义，ensureCapacityInternal 是用户 ArrayList 内部调用的，ensureCapacity 是给外部调用的。当我们需要大量插入元素时，可以先调用 ensureCapacity 方法扩容，这样可以减少在增加元素过程中重新分配的次数</p><h2 id="hashmap-与-hashtable-的区别" tabindex="-1"><a class="header-anchor" href="#hashmap-与-hashtable-的区别" aria-hidden="true">#</a> HashMap 与 HashTable 的区别</h2><ol><li><p>线程是否安全：HashMap 是非线程安全的，HashTable 是线程安全的，因为 HashTable 内部的方法基本都经过 synchronized 修饰</p></li><li><p>效率：因为线程安全的问题，HashMap 要比 HashTable 效率高一点</p></li><li><p>对 Null Key 和 Null Value 的支持：HashMap 支持，HashTable 不允许 Null，否则会抛出 NullPointException</p></li><li><p>初始容量大小和每次扩容大小的不同：</p><ul><li><p>如果不指定初始值</p><ul><li><p>Hashtable 的默认大小为11，之后每次扩容为原来的2n+1</p></li><li><p>HashMap 的默认大小为16，之后每次扩容为原来的2倍</p></li></ul></li><li><p>如果给定了初始值</p><ul><li><p>HashTable 会直接使用给定的初始值</p></li><li><p>HashMap 会将其扩充为2的幂次方</p></li></ul></li></ul></li><li><p>底层数据结构：jdk1.8之后的 HashMap，当链表长度大于阈值（默认为8）时（将链表转换成红黑树之前会判断当前数组的长度，如果小于64，那么会选择数组扩容，而不是转换成红黑树），将链表转化成红黑树，以减少搜索时间</p></li></ol><h3 id="tablesizefor-保证-hashmap-的大小总为-2-的幂次方" tabindex="-1"><a class="header-anchor" href="#tablesizefor-保证-hashmap-的大小总为-2-的幂次方" aria-hidden="true">#</a> tableSizeFor 保证 HashMap 的大小总为 2 的幂次方</h3><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n &gt;&gt;&gt; 1;
    n |= n &gt;&gt;&gt; 2;
    n |= n &gt;&gt;&gt; 4;
    n |= n &gt;&gt;&gt; 8;
    n |= n &gt;&gt;&gt; 16;
    return (n &lt; 0) ? 1 : (n &gt;= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法的作用就是将当前数字 -1 后的结果 n 最高位后面的位都填充 1，得到的最后结果 +1 就会将最高位又进 1</p><p><strong>举个例子</strong></p><p>Cap = 5</p><p>N = 4，也既是 00000100</p><p>它的最后结果就是 00000111，也就是 7</p><p>最后 +1 进位，返回最终结果 8</p><h2 id="hashmap和hashset的区别" tabindex="-1"><a class="header-anchor" href="#hashmap和hashset的区别" aria-hidden="true">#</a> HashMap和HashSet的区别</h2><table><thead><tr><th>类型</th><th>存储内容</th><th>存放方式</th><th>hashCode 计算方式</th></tr></thead><tbody><tr><td>HashMap</td><td>存储键值对</td><td>调用 put 添加元素</td><td>使用键来计算 hashCode</td></tr><tr><td>HashSet</td><td>仅存储对象</td><td>调用 add 增加元素</td><td>使用成员对象来计算 hashCode</td></tr></tbody></table><h2 id="hashmap的底层实现" tabindex="-1"><a class="header-anchor" href="#hashmap的底层实现" aria-hidden="true">#</a> HashMap的底层实现</h2><ul><li>Java8 之前</li></ul><p>底层是数组和链表结合在一起使用的链表散列</p><p>HashMap 通过 key 的 hashCode 经过扰动函数处理后得到 hash 值，然后通过 <code>(n-1)&amp;hash</code> 计算当前元素存放的位置（这里的 n 指的是数组的长度），如果当前位置存在元素的话，就判断该元素与要存入的元素的 hash 值以及 key 是否相同，如果相同的话，直接覆盖，不相同的话就通过拉链法解决</p><p><strong>扰动函数：</strong> 其实就是 HashMap 的 hash 方法，使用 hash 方法也就是扰动函数是为了防止一些实现比较差的 hashCode 方法，换句话说，使用扰动函数之后可以减少碰撞</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h &gt;&gt;&gt; 16);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>拉链法：</strong> 就是创建一个链表数组，数组中每一格就是一个链表，若遇到 hash 冲突，则将冲突的值加到链表中即可</p><figure><img src="https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/java/hash map 拉链法.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>Java8之后</li></ul><p>当链表长度大于阈值时（默认为8），将链表转换为红黑树，以减少搜索时间（转换前会判断当前数组的长度，如果小于64，那么会选择先将数组扩容）</p><figure><img src="https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/java/hash map 链表转红黑树.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="hashmap的长度为什么是2的幂次方" tabindex="-1"><a class="header-anchor" href="#hashmap的长度为什么是2的幂次方" aria-hidden="true">#</a> HashMap的长度为什么是2的幂次方</h2><p>Hash 值的范围在-2<sup>31～2</sup>31-1之间，前后加起来大概40亿的映射空间，这样的数组内存是放不下的，所以我们还需要对数组长度取模运算，得到的余数就是要存放的位置，也就是数组下标</p><p>计算方式就是 <code>hash%n</code>，但是如果除数是2的幂次方的话，那么 <code>hash%n</code> 就等价于 <code>(n-1)&amp;hash</code></p><p>采用与操作相对于%操作来说会提高运算效率，这就解释了为什么 HashMap 的长度为什么是 2的幂次方</p><h2 id="hashmap-多线程操作导致死循环-java8之前" tabindex="-1"><a class="header-anchor" href="#hashmap-多线程操作导致死循环-java8之前" aria-hidden="true">#</a> HashMap 多线程操作导致死循环（Java8之前）</h2>`,45),p={href:"https://coolshell.cn/articles/9606.html",target:"_blank",rel:"noopener noreferrer"},o=e('<h2 id="concurrenthashmap-线程安全的具体实现方式" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap-线程安全的具体实现方式" aria-hidden="true">#</a> ConcurrentHashMap 线程安全的具体实现方式</h2><ul><li>JDK1.7</li></ul><figure><img src="https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/1646558557818-b1756d84-8038-4624-b0ff-0db34cb7fc8c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>首先将数据分为一段一段的存储，然后给每一段数据配一把锁，当一个线程占用锁访问其中一个段数据时，其他段的数据也能被其他线程访问</p><p>ConcurrentHashMap 是由 Segment 和 HashEntry 组成</p><p>Segment 实现了 ReentrantLock，所以 Segment 时一种可重入锁</p><p>一个 ConcurrentHashMap 包含一个 Segment 数组。Segment 的结构和 HashMap 类似，是一种数组和链表结构，一个 Segment 包含一个 HashEntry 数组，每个 HashEntry 是一个链表结构的元素，每个 Segment 守护着一个 HashEntry 的元素，当对 HashEntry 修改时，必须获得对应的 Segment 锁</p><ul><li>JDK1.8</li></ul><figure><img src="https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/java/ConcurrentHashMap java8 锁.png" alt="i" tabindex="0" loading="lazy"><figcaption>i</figcaption></figure><p>ConcurrentHashMap 取消了 Segment 分段锁，采用 CAS 和 synchronized 来保证并发安全。数据结构也是数组+链表/红黑树的形式，Java8在链表长度超过一定阈值时将链表(O(N))转换成红黑树（O (logN)）</p><p>synchronized 只锁定当前链表或者红黑树的首节点，所以只要 hash 不冲突，就不会产生并发</p>',11);function u(v,m){const i=s("ExternalLinkIcon");return t(),l("div",null,[h,a("p",null,[a("a",p,[r("JAVA HASHMAP的死循环"),d(i)])]),o])}const y=n(c,[["render",u],["__file","01_常见问题.html.vue"]]);export{y as default};
