---
title: EasyExcel
date: 2021-10-14
tag: [EasyExcel]
---

```
 💡 官方文档已经非常详细
```

### 基本用法代码示例（写入自定义列数）

```java
public void export(HttpServletResponse response) {
        ExcelWriter excelWriter = null;
        try {
            // URLEncoder.encode防止中文乱码
            String fileName = URLEncoder.encode(getFileName(), "UTF-8");
            // 设置响应头
            response.setContentType("application/vnd.ms-excel");
            response.setCharacterEncoding("utf-8");
            response.setHeader("Content-disposition", "attachment;filename=" + fileName + ".xlsx");

            // LongestMatchColumnWidthStyleStrategy 实现自动列宽
            excelWriter = EasyExcelFactory.write(response.getOutputStream())
									.registerWriteHandler(new LongestMatchColumnWidthStyleStrategy())
									.build();

            // 构建表头
            List<List<String>> statHead = buildStatHead();
            // 构建数据
            List<List<Object>> statData = buildStatData();
            // 写Excel
            WriteSheet sheet1 = EasyExcelFactory.writerSheet(sheetNo, sheetName).head(statHead).build();
            excelWriter.write(statData, sheet1);

        } catch (IOException e) {
            log.error("", e);
        } finally {
            if (excelWriter != null) {
                // 关闭流
                excelWriter.finish();
            }
        }
    }
```

### 参考资料

[EasyExcel官方文档](https://alibaba-easyexcel.github.io/index.html)

[你要的不固定列excel导入导出，它来啦！](https://www.justdojava.com/2021/04/18/easyexcel-01/)
