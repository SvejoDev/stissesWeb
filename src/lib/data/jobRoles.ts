import * as m from '$lib/paraglide/messages';

export const jobRoles = [
    {
        id: 'naturguide',
        title: () => m.job_role_guide_title(),
        description: () => m.job_role_guide_description(),
        filled: true
    },
    {
        id: 'platschef',
        title: () => m.job_role_manager_title(),
        description: () => m.job_role_manager_description(),
        filled: true
    },
    {
        id: 'platsvard',
        title: () => m.job_role_host_title(),
        description: () => m.job_role_host_description(),
        filled: true
    },
    {
        id: 'chauffor',
        title: () => m.job_role_driver_title(),
        description: () => m.job_role_driver_description(),
        filled: true
    },
    {
        id: 'social-media',
        title: () => m.job_role_social_title(),
        description: () => m.job_role_social_description(),
        filled: false
    }
];

// gemensam text för alla roller
export const commonJobInfo = {
    vision: () => m.job_common_vision(),
    requirements: () => m.job_common_requirements()
};