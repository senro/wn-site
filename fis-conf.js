// 利用package.json文件定义项目名和版本
var meta = require('./package.json');
fis.config.set('name', meta.name);
fis.config.set('version', meta.version);

//fis.config.set('name', '9yin');
//fis.config.set('version', '0.0.1');
//设置本地发布路径
fis.config.set('release', '/'+fis.config.get('name')+'/');
//设置内网inner 外网outer，发布路径
fis.config.set('releaseToInner', '/'+fis.config.get('name')+'/');
fis.config.set('releaseToOuter', '/'+fis.config.get('name')+'/');

fis.config.merge({
    roadmap : {
        //所有静态资源文件都使用 http://s1.example.com 或者 http://s2.example.com 作为域名
        domain : 'http://127.0.0.1:8080'
    }
});

//设置发布配置
fis.config.set('roadmap.path', [
    {
        //md后缀的文件不发布
        reg : '**.md',
        release : false
    },
    {
        //txt后缀的文件不发布
        reg : '**.txt',
        release : false
    },
    {
        //publish-bak文件夹不发布
        reg : /^\/publish-bak\//i,
        release : false
    },
    {
        //test后缀的文件夹不发布
        reg : /^\/test\//i,
        release : false
    },
    {
        //component_modules文件夹不发布
        reg : /^\/component_modules\//i,
        release : false
    },
//    {
//        //component_modules目录下的文件发布到【项目名/component_modules/】目录下
//        reg : /^\/component_modules\/(.*)$/i,
//        id : 'component_modules/$1',
//        isComponentModules : true,
//        useMap : true,
//        release : fis.config.get('release')+'component_modules/$1'
//    },
    {
        //spm_modules目录下的文件发布到【项目名/spm_modules/】目录下
        reg : /^\/spm_modules\/(.*)$/i,
        //id : 'spm_modules/$1',
        isSpmModules : true,
        useMap : true,
        release : fis.config.get('release')+'spm_modules/$1'
    },
    {
        // component目录下的文件发布到【项目名/components/】目录下
        reg : /^\/components\/(.*)$/i,
        //id : '$1',
        isComponents : true,
        useMap : true,
        release : fis.config.get('release')+'components/$1'
    },
//    {
//        //项目模块化目录没有版本号结构，用全局版本号控制发布结构
//        reg : /^\/(components|components_modules)\/(.*)\.init\.js$/i,
//        isComponents : false
//    },
    {
        //views目录下的文件发布到【项目名/】目录下
        reg : /^\/views\/(.*)$/,
        //id:'$1',
        release : fis.config.get('release')+'$1',
        isViews : true
    },
    {
        //static目录下的文件发布到【项目名/static/】目录下
        reg : /^\/static\/(.*)$/,
        release : fis.config.get('release')+'static/$1',
        isComponents : false,
        useOptimizer : false
    },
//    {
//        //md后缀的文件不发布
//        reg : '**.tpl',
//        useMap : true
//    },
    {
        //其他文件就不属于前端项目了，比如nodejs的后端代码
        //不处理这些文件的资源定位替换（useStandard: false）
        //也不用对这些资源进行压缩(useOptimizer: false)
        reg : '**',
        release:false,
        useStandard : false,
        useOptimizer : false
    }
]);

