import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as n,e as i}from"./app.51e0e208.js";const r={},o=i(`<h2 id="问题背景" tabindex="-1"><a class="header-anchor" href="#问题背景" aria-hidden="true">#</a> <strong>问题背景</strong></h2><p>在idea集成Maven开发时，新建项目后出现 <code>Unable to import maven project: See logs for details</code> 的问题，百思不得其解，打开idea的log日志后发现有如下报错（日志过长，只截取部分）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ERROR - #org.jetbrains.idea.maven - com.google.inject.CreationException: Unable to create injector, see the following errors:

1) No implementation for org.apache.maven.model.path.PathTranslator was bound.
  while locating org.apache.maven.model.path.PathTranslator
    for field at org.apache.maven.model.interpolation.AbstractStringBasedModelInterpolator.pathTranslator(Unknown Source)
  at org.codehaus.plexus.DefaultPlexusContainer$1.configure(DefaultPlexusContainer.java:350)

2) No implementation for org.apache.maven.model.path.UrlNormalizer was bound.
  while locating org.apache.maven.model.path.UrlNormalizer
    for field at org.apache.maven.model.interpolation.AbstractStringBasedModelInterpolator.urlNormalizer(Unknown Source)
  at org.codehaus.plexus.DefaultPlexusContainer$1.configure(DefaultPlexusContainer.java:350)

2 errors 
java.lang.RuntimeException: com.google.inject.CreationException: Unable to create injector, see the following errors:

1) No implementation for org.apache.maven.model.path.PathTranslator was bound.
  while locating org.apache.maven.model.path.PathTranslator
    for field at org.apache.maven.model.interpolation.AbstractStringBasedModelInterpolator.pathTranslator(Unknown Source)
  at org.codehaus.plexus.DefaultPlexusContainer$1.configure(DefaultPlexusContainer.java:350)

2) No implementation for org.apache.maven.model.path.UrlNormalizer was bound.
  while locating org.apache.maven.model.path.UrlNormalizer
    for field at org.apache.maven.model.interpolation.AbstractStringBasedModelInterpolator.urlNormalizer(Unknown Source)
  at org.codehaus.plexus.DefaultPlexusContainer$1.configure(DefaultPlexusContainer.java:350)

2 errors
	at com.google.inject.internal.Errors.throwCreationExceptionIfErrorsExist(Errors.java:543)
	at com.google.inject.internal.InternalInjectorCreator.initializeStatically(InternalInjectorCreator.java:159)
	at com.google.inject.internal.InternalInjectorCreator.build(InternalInjectorCreator.java:106)
	at com.google.inject.Guice.createInjector(Guice.java:87)
	at com.google.inject.Guice.createInjector(Guice.java:69)
	at com.google.inject.Guice.createInjector(Guice.java:59)
    .......
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="问题解决" tabindex="-1"><a class="header-anchor" href="#问题解决" aria-hidden="true">#</a> <strong>问题解决</strong></h2><p>根据日志信息完全推不出什么有效信息，所以猜想有没有可能是版本的问题，所以下了一个去年的版本，按照之前一样的配置将环境配置好，发现问题解决.....</p><hr><h2 id="感言" tabindex="-1"><a class="header-anchor" href="#感言" aria-hidden="true">#</a> <strong>感言</strong></h2><p>浪费了很多时间，生气😫</p><hr>`,10),t=[o];function l(s,c){return a(),n("div",null,t)}const m=e(r,[["render",l],["__file","003_maven_compatibility_issue.html.vue"]]);export{m as default};
