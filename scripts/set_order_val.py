import json
import os

# data.json 路径
data_json_path = './.obsidian/plugins/obsidian-bartender/data.json'
# path 前缀
path_prefix = './'
# 需要排除的目录
exclude_paths = ['/', 'src']


def fill_order_val():
    """
    以 bartender 插件的 data.json 数据为基础, 为 md 文件设置 order 值
    data.json 格式如下
        "src": [
            "src/daliy",
            "src/code",
            "src/single_page",
            "src/blog",
            "src/P.A.R.A",
            "src/staged",
            "src/README.md"
        ],
    """

    # 读取 data.json 文件, 存在 data.json 文件中的目录才需要排序
    with open(data_json_path) as f:
        json_data = json.load(f)

    # 获取实际排序数据
    item_order_json = json_data['fileExplorerOrder']

    # 按照 data 数据分别给 md 文件/文件夹设置 order 值
    for item_name in item_order_json:
        # 文件夹不存在
        if not os.path.exists(path_prefix + item_name) or item_name in exclude_paths:
            return
        # 获取每个 item 下文件排序
        item_order_list = list(item_order_json[item_name])

        # 判断是文件排序还是文件夹排序
        if is_md_sort(item_order_list):
            deal_md_file(item_order_list)
        else:
            deal_dir(item_order_list)


def deal_md_file(single_dir_data):
    i = 0
    for md_file in single_dir_data:
        if not str(md_file).endswith('.md') or str(md_file).endswith('README.md'):
            return
        if not os.path.exists(path_prefix + md_file):
            return
        with open(path_prefix + md_file, 'r') as f:
            lines = f.readlines()
        lines.insert(1, 'order: {order} \n'.format(order=i))
        i += 1
        with open(path_prefix + md_file, 'w') as f:
            f.writelines(lines)


def deal_dir(single_dir_data):
    # 目录排序规则暂时不明确
    return


def is_md_sort(single_dir_data):
    for md_file in single_dir_data:
        if str(md_file).endswith('.md') and str(md_file) != 'README.md':
            return True
    return False


if __name__ == '__main__':
    fill_order_val()
