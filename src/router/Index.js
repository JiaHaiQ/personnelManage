const router = [
    {
        title: '控制台',
        icon: 'index',
        key: '/index'
    },
    {
        title: '用户管理',
        icon: 'laptop',
        key: '/index/user',
        child: [
            { key: '/index/user/list', title: '客户列表', icon: '' },
            {
                key: '/index/user/add',
                title: '添加客户',
                icon: ''
            },
        ]
    },
    {
        title: '部门管理',
        icon: 'department',
        key: '/index/department',
        child: [
            { key: '/index/department/list', title: '部门列表', icon: '' },
            { key: '/index/department/add', title: '添加部门', icon: '', }
        ]
    }
    ,
    {
        title: '职位管理',
        icon: 'job',
        key: '/index/job',
        child: [
            { key: '/index/job/list', title: '职位列表', icon: '' },
            { key: '/index/job/add', title: '添加职位', icon: '', }
        ]
    },
    {
        title: '加班',
        icon: 'info-circle-o',
        key: '/home/about'
    },
    {
        title: '请假',
        icon: 'info-circle-o',
        key: '/home/a'
    },
]

export default router;