---
title: React Native 中通过蓝牙连接汉印标签打印机 D35BT
tags:
  - react-native
  - expo
  - react-native-ble-plx
  - bluetooth
  - 标签打印机
category:
  - React Native
---

# React Native 中通过蓝牙连接汉印标签打印机 D35BT

## 项目背景

最近和朋友合作搞项目，用 React Native & Expo 开发了一个 Android APP
项目中有个需求是「标签打印」，结合 APP 中的具体信息，打印出标签

由于指定了打印机型号（汉印 D35BT）以及连接方式（蓝牙 Bluetooth），于是基于打印机展开调研
现在比较流行的三方库有 `react-native-ble-manager` 以及 `react-native-ble-plx`
通过简单的 demo 测试后选择了 **[`react-native-ble-plx`](https://github.com/dotintent/react-native-ble-plx)**

具体设备信息
- 打印机型号：**汉印 D35BT**
- 蓝牙协议：**BLE（低功耗蓝牙）**
- 打印指令：**CPCL**

## 具体代码

>  注意：蓝牙模块不能在虚拟机中测试，需要安装到实体设备中进行测试
>  详情请看 [Introduction to development builds - Expo](https://docs.expo.dev/develop/development-builds/introduction/)

代码分为几个主要的组成部分
- 引入 BleManager, 以及初始化
- 扫描周围设备，筛选出打印机（通过名称或类型）
- 通过蓝牙连接打印机
- 发送数据到打印机中
- 引入 Native Module 原生模块，调用 GBK convert

```ts
const {GbkModule} = NativeModules;  
  
const convertToGbk = async (text: string) => {  
    try {  
        const base64String = await GbkModule.convertToGbk(text);  
        if (!base64String) {  
            console.error("Failed to get GBK data");  
            return;  
        }  
        return Buffer.from(base64String, 'base64');  
    } catch (error) {  
        console.error("convertToGbk failed:", error);  
        return null;  
    }  
};  
  
// 初始化 BleManager  
const [manager] = useState(() => new BleManager());  
// 存储扫描到的设备  
const [devices, setDevices] = useState<Device[]>([]);  
// 存储已连接的设备  
const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);  
  
// 请求蓝牙权限  
const requestBluetoothPermission = async () => {  
    if (Platform.OS === 'android' && Platform.Version >= 31) {  
        const granted = await PermissionsAndroid.request(  
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,  
            {  
                title: '蓝牙权限',  
                message: '此应用需要蓝牙权限以扫描设备。',  
                buttonNeutral: '稍后询问',  
                buttonNegative: '取消',  
                buttonPositive: '确定',  
            },  
        );  
        return granted === PermissionsAndroid.RESULTS.GRANTED;  
    }  
    return true;  
};  

// 检查蓝牙状态  
const checkBluetoothState = async () => {  
    const state = await manager.state();  
    if (state !== 'PoweredOn') {  
        Linking.sendIntent('android.settings.BLUETOOTH_SETTINGS');  
        return false;  
    }  
    return true;  
};  

// 扫描蓝牙设备  
const startScan = async () => {  
  
    const hasPermission = await requestBluetoothPermission();  
    if (!hasPermission) return;  
  
    const isBluetoothEnabled = await checkBluetoothState();  
    if (!isBluetoothEnabled) return;  
  
    setDevices([]); // 清空之前的设备列表  
    manager.startDeviceScan(null, null, (error, device) => {  
        if (error) {  
            console.error('扫描错误:', error);  
            return;  
        }  
        // 过滤以 "DB35" 开头的设备  
        if (device && device.name && device.name.startsWith('D35')) {  
            setDevices((prevDevices) => {  
                const exists = prevDevices.some((d) => d.id === device.id);  
                if (!exists) {  
                    return [...prevDevices, device];  
                }  
                return prevDevices;  
            });  
        }  
    });  
  
    setTimeout(() => manager.stopDeviceScan(), 50000);  
};  
  
// 连接到蓝牙设备  
const connectToDevice = async (deviceId: string) => {  
    try {  
        const device = await manager.connectToDevice(deviceId); 
        await device.discoverAllServicesAndCharacteristics();  
        setConnectedDevice(device);  
        manager.stopDeviceScan();  
    } catch (error) {  
        console.error('连接失败:', error);  
    }  
};  
  
// 发送 CPCL 打印指令  
const sendPrintCommand = async () => {  
    if (!connectedDevice) {  
        console.warn('No connected device');  
        return;  
    }  
  
    // 可以在 device 信息中找到支持读写的 characteristicUUID
    const serviceUUID = '49535343-fe7d-4ae5-8fa9-9fafd205e455';  
    const characteristicUUID = '49535343-8841-43f4-a8d4-ecbe34729bb3';  
    
    const cpclCommand = `! 0 200 200 232 1\r\nTEXT 0 0 180 30 Hello, World!\r\nFORM\r\nPRINT\r\n`
  
    const base64Command = cpclCommand.toString('base64');  
  
    try {  
        const MTU = 20; // BLE 默认每包 20 字节  
        for (let i = 0; i < base64Command.length; i += MTU) {  
            const chunk = base64Command.slice(i, i + MTU);  
            await connectedDevice.writeCharacteristicWithResponseForService(  
                serviceUUID,  
                characteristicUUID,  
                chunk  
            );  
            await new Promise((resolve) => setTimeout(resolve, 30));  
        }  
        await new Promise((resolve) => setTimeout(resolve, 1000));  
    } catch (err) {  
        console.error(`❌ 发送失败:`, err);  
    }  
};
```

#### 项目启动常用命令

- `pnpm expo prebuild`
- `pnpm expo run:android`
- `cd android && ./gradlew clean &&./gradlew assembleDebug`

## 踩过的几个坑

当 “Hello，World” 在标签纸上打印出来的那刻，以为万事大吉，结果发现故事才刚刚开始...
这个模块总共花了 3d，但从开始到打印出 “HelloWorld” 只花了 1d 不到而已，后面被各种坑折磨了 2d！

### 打印机的中文乱码问题

问题的根源如下

- 打印机只支持 GBK 的编码方式切且不能修改（这点与技术支持对接过，姑且认为是真的），所以需要对要打印的中文部分进行转码
- React Native 不认 GBK 这些古老的编码方式，以及 iconv-lite 这类依赖于 nodeJS 的库不能直接使用，所以需要用户去实现 GBK 编码的问题

调研了一下现有 React Native 中编码的方案
- ~~引入 GBK 编码映射库（包括通用字），自己对中文进行转码~~ ❌
    如果只是打印一些固定文案的话还可以，甚至可以直接将 GBK 字符硬编码到代码中，例如

```CPCL
! 0 200 200 100 1
TEXT 0 0 180 30 \xC4\xE3\xBA\xC3, \xCA\xC0\xBD\xE7
FORM
PRINT
```

*指令中的 \xC4\xE3\xBA\xC3, \xCA\xC0\xBD\xE7 部分为 "你好，世界"*

- 在 React Native 生成的 Android 文件部分编写代码，通过 `@ReactMethod` 桥接的方式，在 Android 部分实现转码的代码，并将结果传到 React Native 中进行处理 ✅

#### 实现 Android 层面原生代码

```kotlin
// 实现 convert to GBK 逻辑
class GbkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {  
  
    override fun getName(): String {  
        return "GbkModule"  
    }  
  
    @ReactMethod  
    fun convertToGbk(text: String, promise: Promise) {  
        try {  
            val gbkBytes = text.toByteArray(Charset.forName("GBK"))  
            val base64String = Base64.encodeToString(gbkBytes, Base64.NO_WRAP)  
            promise.resolve(base64String)  
        } catch (e: Exception) {  
            promise.reject("Error", e)  
        }  
    }  
}
```

```kotlin
// 包装为 Native Module
class GbkPackage : ReactPackage {  
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {  
        return listOf(GbkModule(reactContext))  
    }  
  
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {  
        return emptyList()  
    }  
}

```

```kotlin
// 在 MainApplication 中引入 GbkPackage
class MainApplication : Application(), ReactApplication {  
  
  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(  
        this,  
        object : DefaultReactNativeHost(this) {  
          override fun getPackages(): List<ReactPackage> {  
            val packages = PackageList(this).packages
            packages.add(GbkPackage());  
            return packages  
          }    
      }  
  ) 
} 
```

#### 在 React Native 中调用 NativeModule

我选择了比较容易传输的 String 形式，在 Android 层将 gbk 字节流先编码给 base64 的形式，然后传输给 React Native 中

```ts
const {GbkModule} = NativeModules;  
  
const convertToGbk = async (text: string) => {  
    try {  
        const base64String = await GbkModule.convertToGbk(text);  
        if (!base64String) {  
            console.error("Failed to get GBK data");  
            return;  
        }  
        return Buffer.from(base64String, 'base64');  
    } catch (error) {  
        console.error("convertToGbk failed:", error);  
        return null;  
    }  
};
```

*注意：在 React Native 中使用 GbkModule 需要对 Android 代码清理并重新构建
`./gradlew clean &&./gradlew assembleDebug`

### 设备与打印机交互单次 bluetooth 数据传输长度问题

*这也是一个调通前抓耳挠腮，调通后感觉不过如此的问题*

以一段简单的代码为例，在我成功打印出 Hello World 后，想要测试多行文本打印效果时，却发现死活打印不出来，能看到打印机的指示灯闪烁（证明蓝牙成功传输了数据），但是不打印东西

```CPCL
! 0 200 200 100 1
TEXT 0 0 180 30 HelloWorld
TEXT 0 0 180 70 HelloWorld
FORM
PRINT
```

我猜想，是否数据过长导致我的指令没有完成打印
于是我在代码中，以 20 字节为界，向打印机传输数据，果然成功打印... 

这边出现一个新的概念 MTU（Maximum Transmission Unit，最大传输单元）
- BLE（低功耗蓝牙）默认 MTU 为 23 字节（包括 3 字节头部，净数据 20 字节），而多数现代打印机支持更大的字节数，比如 128 字节
- 上述指令转化为 Buffer 又编码为 base64，数据部分长度超过 100 字节

#### 痛苦宣言

这个困扰我一天的问题，写来容易，但是调通的过程真的是非常痛苦
由于是第一次接触蓝牙打印机和 CPCL 指令，这些问题只能一点点去排查，一点点地去研究文档，生怕错过要点

在写文章的同时，我又查看了一遍被我放弃的另一个方案 react-native-ble-manager 的文档
它封装的[写数据](*https://innoveit.github.io/react-native-ble-manager/methods/#writeperipheralid-serviceuuid-characteristicuuid-data-maxbytesize)方法如下
-  `write(peripheralId, serviceUUID, characteristicUUID, data, maxByteSize)`

看到 `maxByteSize` 字段，我心里咯噔一下，然后又仔细看了一下字段的解释
- `specify the max byte size before splitting message, defaults to 20 bytes if not specified`

真的是要被气红温了!!! 如果当初采用了这个三方库......

## 附：CPCL 指令简单介绍

*文章中存在一些 CPCL 指令，如果之前没接触过 CPCL 指令，可以先看这一段解惑*

#### 通过一条简单的指令来了解 CPCL 的结构

```CPCL
! 0 200 200 210 1
TEXT 4 0 30 40 Hello World
FORM
PRINT
```

其中
- <!> {offset} <200> <200> {height} {qty}
    - "!" 字符作为命令的开头
    - offset 为偏置参数，默认填 0 即可
    - x、y 为横向分辨率、纵向分辨率，可以根据打印机自检信息填写
    - height 为标签高度（单位：dot），一般情况下，1mm = 8dot，即 20mm 高度标签纸填 160dot
    - qty 为要打印的标签数量，填 1 即可
- {command} {font} {size} {x} {y} {data}
    - TEXT 为文本打印命令
    - font、size 为字体、字号，可以替换为 0 0 来获得默认字体字号
    - x、y 为打印开始的坐标，根据标签纸位置调试得出
- FORM 命令可以指示打印机在一页打印结束后切换至下一页顶部
- PRINT 命令作为命令集的结束命令，将会启动文件打印

#### CPCL 指令示例（在 D35BT 调试成功）

- 适配 HPRT 40mm * 30mm 标签纸

```CPCL
! 0 0 0 240 1
T 0 0 0 40 Line1:  
T 0 0 0 90 Line2: 
T 0 0 0 140 Line3: 
T 0 0 0 190 Line4: 
T 0 0 120 40 data1
T 0 0 120 90 data2
T 0 0 120 140 data3
T 0 0 120 190 data4
FORM
PRINT
```

- 适配 HPRT 30mm * 20mm 标签纸

```CPCL
! 0 0 0 160 1
T 3 6 40 30 Line1: 
T 3 6 40 50 Line2: 
T 3 6 40 70 Line3: 
T 3 6 40 90 Line4: 
T 3 6 120 30 data1
T 3 6 120 50 data2
T 3 6 120 70 data3
T 3 6 120 90 data4
FORM
PRINT
```

- 参考：*[汉印 CPCL 编程手册](https://github.com/logycoconut/books/blob/main/Documentation/HPRT%20HM-Z3%3AHM-T3%20%E7%BC%96%E7%A8%8B%E6%89%8B%E5%86%8C.CPCL%20%E6%8C%87%E4%BB%A4/HPRT%20HM-Z3%3AHM-T3%20%E7%BC%96%E7%A8%8B%E6%89%8B%E5%86%8C.CPCL%20%E6%8C%87%E4%BB%A4.pdf)*